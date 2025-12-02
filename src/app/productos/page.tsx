'use client'
import { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Filter, Grid, Search } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

function ProductContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    category: searchParams.get('category') || '',
    style: searchParams.get('style') || ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.category) params.set('category', filter.category);
      if (filter.style) params.set('style', filter.style);
      const url = '/api/products?' + params.toString();
      try {
        const res = await axios.get(url);
        setProducts(res.data.products || res.data);
      } catch (error) {
        console.error('Error loading products', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filter]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Nuestra Tienda</h1>
        <p className="text-gray-600">Descubre piezas únicas que definen tu estilo</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={filter.category}
              onChange={e => setFilter({ ...filter, category: e.target.value })}
            >
              <option value="">Todas</option>
              <option value="vestidos">Vestidos</option>
              <option value="croptops">Croptops</option>
              <option value="jeans">Jeans</option>
              <option value="conjuntos">Conjuntos</option>
              <option value="faldas">Faldas</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
            <select
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              value={filter.style}
              onChange={e => setFilter({ ...filter, style: e.target.value })}
            >
              <option value="">Todos los estilos</option>
              <option value="Elegante">Elegante</option>
              <option value="Gótico">Gótico</option>
              <option value="Coquette">Coquette</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p: any, index: number) => {
            // Generate slug if it doesn't exist
            const slug = p.slug || p.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || p._id;

            return (
              <Link
                key={p._id}
                href={`/productos/${slug}`}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={p.images?.[0] || p.image || '/logo.png'}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Action Button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 px-4">
                    <span className="w-full py-3 bg-white/90 backdrop-blur-sm text-gray-900 text-center text-sm font-semibold rounded-xl hover:bg-white transition-colors shadow-lg">
                      Ver Detalles
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {p.stock <= 3 && p.stock > 0 && (
                      <span className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm">
                        ¡Últimas unidades!
                      </span>
                    )}
                    {p.stock === 0 && (
                      <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm">
                        Agotado
                      </span>
                    )}
                    {p.style && (
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-900 text-xs font-bold rounded-full shadow-sm">
                        {p.style}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-2">
                    <h3 className="font-serif text-lg text-gray-900 line-clamp-1 group-hover:text-purple-700 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{p.category}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-gray-900">
                      ${p.price?.toLocaleString('es-CO')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <Search className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <Grid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">Intenta con otros filtros</p>
        </div>
      )}
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductContent />
    </Suspense>
  )
}

