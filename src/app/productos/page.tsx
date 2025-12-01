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
                className="group bg-white rounded-2xl shadow-md overflow-hidden card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                  <Image
                    src={p.images?.[0] || p.image || '/logo.png'}
                    alt={p.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  {p.stock <= 3 && p.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ¡Últimas unidades!
                    </div>
                  )}
                  {p.stock === 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Agotado
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">${p.price?.toFixed(2)}</span>
                    {p.style && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {p.style}
                      </span>
                    )}
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

