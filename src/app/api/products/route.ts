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

    const filter: any = { active: true };
    if (category) filter.category = category;
    if (style) filter.style = style;
    if (q) filter.name = { $regex: q, $options: 'i' };

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar datos con Yup
    try {
      await productSchema.validate(body, { abortEarly: false });
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
