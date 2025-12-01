import Product from '@/models/Product'
import { connectMongoose } from '@/lib/mongodb'
import Link from 'next/link'

export default async function AdminPage(){
  await connectMongoose();
  const total = await Product.countDocuments();
  const lowStock = await Product.find({ stock: { $lte: 3 }}).limit(5).lean();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Panel Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Productos</div>
          <div className="text-2xl font-semibold">{total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Stock bajo</div>
          <div className="text-2xl font-semibold">{lowStock.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Link href="/admin/products" className="px-4 py-2 rounded bg-morado text-white">Gestionar productos</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Productos con bajo stock</h2>
        <ul>
          {lowStock.map((p:any)=>(
            <li key={p._id} className="flex justify-between py-2 border-t">
              <div>{p.name}</div>
              <div className="text-red-600">{p.stock}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
