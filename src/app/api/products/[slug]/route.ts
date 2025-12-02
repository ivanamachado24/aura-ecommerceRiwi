import { NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log(`=== GET /api/products/${slug} ===`);

    await connectMongoose();
    const product = await Product.findOne({ slug }).lean();

    console.log('Search result:', product ? 'Found' : 'Not Found');
    if (product) {
      console.log('Product ID:', (product as any)._id);
      console.log('Product Slug:', (product as any).slug);
    }

    if (!product) {
      console.log('Available products slugs:', (await Product.find({}).select('slug').lean()).map((p: any) => p.slug));
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectMongoose();

    const contentType = request.headers.get('content-type') || '';

    // Check if this is a FormData request (with new images)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // Extract form fields
      const name = formData.get('name') as string;
      const newSlug = formData.get('slug') as string;
      const description = formData.get('description') as string;
      const price = parseFloat(formData.get('price') as string);
      const category = formData.get('category') as string;
      const style = formData.get('style') as string;
      const stock = parseInt(formData.get('stock') as string);
      const sizesString = formData.get('sizes') as string;
      const sizes = sizesString ? sizesString.split(',').map(s => s.trim()) : [];

      // Get existing images
      const existingImagesString = formData.get('existingImages') as string;
      const existingImages = existingImagesString ? JSON.parse(existingImagesString) : [];

      // Upload new images to Cloudinary
      const newImageUrls: string[] = [];
      const imageFiles = formData.getAll('images') as File[];

      if (imageFiles && imageFiles.length > 0) {
        const cloudinary = (await import('@/lib/cloudinary')).default;

        for (const imageFile of imageFiles) {
          if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

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
                  if (error) reject(error);
                  else resolve(result);
                }
              ).end(buffer);
            });

            newImageUrls.push(result.secure_url);
          }
        }
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      const updateData = {
        name,
        slug: newSlug,
        description,
        price,
        category,
        style,
        stock,
        sizes,
        images: allImages,
      };

      const updated = await Product.findOneAndUpdate({ slug }, updateData, { new: true }).lean();
      return NextResponse.json(updated);
    } else {
      // Handle JSON request (no new images)
      const body = await request.json();
      const updated = await Product.findOneAndUpdate({ slug }, body, { new: true }).lean();
      return NextResponse.json(updated);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Error al actualizar producto', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectMongoose();
    await Product.findOneAndDelete({ slug });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
