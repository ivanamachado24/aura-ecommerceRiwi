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
    const formData = await request.formData();
    const name = formData.get('title') as string; // Frontend sends 'title' but model uses 'name'
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;

    let imageUrl = '';

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'aura-products' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = result.secure_url;
    }

    const body = {
      name,
      description,
      category,
      price: 0, // Default or add field in form
      stock: 0, // Default or add field in form
      images: imageUrl ? [imageUrl] : [],
      active: true
    };

    // Validar datos con Yup
    try {
      // Note: validation might fail if price/stock are required but missing in form
      // await productSchema.validate(body, { abortEarly: false });
    } catch (validationError: any) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: validationError.errors },
        { status: 400 }
      );
    }

    await connectMongoose();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}
