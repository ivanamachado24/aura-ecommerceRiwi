import { connectMongoose } from '@/lib/mongodb'
import Product from '@/models/Product'
import Link from 'next/link'

export default async function AdminProducts(){
  await connectMongoose();
  const products = await Product.find({}).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <Link href="/admin/products/new" className="px-3 py-2 bg-morado text-white rounded">Nuevo producto</Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead className="text-left text-sm text-gray-500">
            <tr><th>Nombre</th><th>Categoria</th><th>Estilo</th><th>Stock</th><th>Precio</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p:any)=>(
              <tr key={p._id} className="border-t">
                <td className="py-2">{p.name}</td>
                <td>{p.category}</td>
                <td>{p.style}</td>
                <td>{p.stock}</td>
                <td>${p.price.toFixed(2)}</td>
                <td className="text-right">
                  <Link href={`/admin/products/${p.slug}`} className="px-2 py-1 border rounded mr-2">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
