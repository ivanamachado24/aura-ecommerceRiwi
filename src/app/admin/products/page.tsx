import { connectMongoose } from '@/lib/mongodb'
import Product from '@/models/Product'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import { Plus, Edit, Package, Search } from 'lucide-react'

export default async function AdminProducts() {
  await connectMongoose();
  const products = await Product.find({}).lean();

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Productos</h1>
            <p className="text-gray-600">Gestiona tu inventario</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo producto
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Categoría</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Estilo</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Stock</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Precio</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p: any, index: number) => (
                  <tr
                    key={p._id}
                    className="hover:bg-purple-50/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{p.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{p.style}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${p.stock === 0 ? 'text-red-600' :
                          p.stock <= 3 ? 'text-orange-600' :
                            'text-green-600'
                        }`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-purple-600">${p.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/products/${p.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay productos</h3>
              <p className="text-gray-600 mb-6">Comienza agregando tu primer producto</p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                Nuevo producto
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
