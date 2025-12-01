import Product from '@/models/Product'
import { connectMongoose } from '@/lib/mongodb'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import StatCard from '@/components/StatCard'
import { Package, TrendingDown, AlertTriangle, Plus } from 'lucide-react'

export default async function AdminPage() {
  await connectMongoose();
  const total = await Product.countDocuments();
  const lowStock = await Product.find({ stock: { $lte: 3 } }).limit(5).lean();
  const outOfStock = await Product.countDocuments({ stock: 0 });

  return (
    <AdminLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bienvenida al panel de administración</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Productos"
            value={total}
            icon={Package}
            color="purple"
          />
          <StatCard
            title="Stock Bajo"
            value={lowStock.length}
            icon={AlertTriangle}
            color="pink"
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Agotados"
            value={outOfStock}
            icon={TrendingDown}
            color="blue"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/products/new"
            className="group bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-xl">
                <Plus className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Nuevo Producto</h3>
                <p className="text-purple-100">Agregar producto a la tienda</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Gestionar Productos</h3>
                <p className="text-gray-600">Ver y editar productos</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Productos con bajo stock</h2>
            <Link href="/admin/products" className="text-purple-600 hover:text-purple-700 font-medium">
              Ver todos
            </Link>
          </div>
          {lowStock.length > 0 ? (
            <div className="space-y-3">
              {lowStock.map((p: any) => (
                <div key={p._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-600">{p.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{p.stock}</div>
                      <div className="text-xs text-gray-500">unidades</div>
                    </div>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay productos con stock bajo</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
