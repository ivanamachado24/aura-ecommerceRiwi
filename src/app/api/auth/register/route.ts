import { NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validations';


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar datos con Yup
    try {
      await registerSchema.validate(body, { abortEarly: false });
    } catch (validationError: any) {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: validationError.errors },
        { status: 400 }
      );
    }

    const { email, password, name } = body;

    await connectMongoose();
    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return NextResponse.json({ message: 'Usuario ya existe' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    const created = await User.create({ email, password: hash, role: 'customer', name });
    return NextResponse.json({ success: true, id: created._id });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { message: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}


