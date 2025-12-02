import { NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongodb';
import Product from '@/models/Product';
import { productSchema } from '@/lib/validations';


export async function GET(request: Request) {
  try {
    await connectMongoose();
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const style = url.searchParams.get('style');
    const q = url.searchParams.get('q');

    // Pagination
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const filter: any = { active: true };
    if (category) filter.category = category;
    if (style) filter.style = style;
    if (q) filter.name = { $regex: q, $options: 'i' };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    console.log('=== POST /api/products - Starting ===');
    const formData = await request.formData();

    // Extract all fields from FormData
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const style = formData.get('style') as string;
    const stock = parseInt(formData.get('stock') as string);
    const sizesString = formData.get('sizes') as string;
    const sizes = sizesString ? sizesString.split(',').map(s => s.trim()) : [];

    console.log('Form data extracted:', { name, slug, price, category, style, stock, sizes });

    // Handle multiple images
    const imageUrls: string[] = [];
    const imageFiles = formData.getAll('images') as File[];

    console.log('Number of image files:', imageFiles.length);

    if (!imageFiles || imageFiles.length === 0) {
      console.error('No images provided');
      return NextResponse.json(
        { error: 'Debe subir al menos una imagen' },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    console.log('Starting Cloudinary upload...');
    console.log('Cloudinary Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'undefined',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'undefined'
    });

    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        console.log(`Uploading image: ${imageFile.name}, size: ${imageFile.size}`);
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const result: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'aura-products',
              transformation: [
                { width: 1000, height: 1000, crop: 'limit' },
                { quality: 'auto' }
              ]
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                console.log('Cloudinary upload success:', result?.secure_url);
                resolve(result);
              }
            }
          ).end(buffer);
        });

        imageUrls.push(result.secure_url);
      }
    }

    const body = {
      name,
      slug,
      description: description || '', // Allow empty description
      price,
      category,
      style,
      sizes,
      stock,
      images: imageUrls,
      active: true
    };

    console.log('Product data to validate:', body);

    // Validate data with Yup
    try {
      await productSchema.validate(body, { abortEarly: false });
      console.log('Validation passed');
    } catch (validationError: any) {
      console.error('Validation error:', validationError.errors || validationError.message);
      return NextResponse.json(
        { error: 'Datos inválidos', details: validationError.errors || validationError.message },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    await connectMongoose();

    console.log('Creating product in database...');
    const product = await Product.create(body);
    console.log('Product created successfully:', product._id);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('=== Error creating product ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al crear producto', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
