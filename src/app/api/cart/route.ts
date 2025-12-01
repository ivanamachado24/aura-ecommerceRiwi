import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectMongoose } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function GET(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        await connectMongoose();
        let cart = await Cart.findOne({ userId: session.user.email });

        if (!cart) {
            cart = await Cart.create({ userId: session.user.email, items: [] });
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json({ error: 'Error al obtener carrito' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const body = await request.json();
        const { productId, name, price, size, quantity } = body;

        await connectMongoose();
        let cart = await Cart.findOne({ userId: session.user.email });

        if (!cart) {
            cart = await Cart.create({
                userId: session.user.email,
                items: [{ productId, name, price, size, quantity }]
            });
        } else {
            const existingItem = cart.items.find(
                (item: any) => item.productId === productId && item.size === size
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, size, quantity });
            }

            await cart.save();
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json({ error: 'Error al actualizar carrito' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const url = new URL(request.url);
        const productId = url.searchParams.get('productId');

        await connectMongoose();
        const cart = await Cart.findOne({ userId: session.user.email });

        if (!cart) {
            return NextResponse.json({ error: 'Carrito no encontrado' }, { status: 404 });
        }

        if (productId) {
            cart.items = cart.items.filter((item: any) => item.productId !== productId);
        } else {
            cart.items = [];
        }

        await cart.save();
        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error deleting from cart:', error);
        return NextResponse.json({ error: 'Error al eliminar del carrito' }, { status: 500 });
    }
}
