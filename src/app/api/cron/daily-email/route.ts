import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { connectMongoose } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
    // Verificar autorización (simple token check)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        await connectMongoose();

        // Ejemplo: Enviar reporte de stock bajo
        const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).lean();

        if (lowStockProducts.length > 0) {
            const html = `
        <h1>Reporte Diario de Stock Bajo</h1>
        <p>Los siguientes productos tienen poco stock:</p>
        <ul>
          ${lowStockProducts.map((p: any) => `<li>${p.name}: ${p.stock} unidades</li>`).join('')}
        </ul>
      `;

            await sendEmail(process.env.ADMIN_EMAIL || 'admin@aura.com', 'Alerta de Stock Bajo - Aura', html);
        }

        return NextResponse.json({ success: true, message: 'Cron job executed successfully' });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ success: false, error: 'Cron job failed' }, { status: 500 });
    }
}
