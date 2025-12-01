'use client'
import { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

function ProductContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    category: searchParams.get('category') || '',
    style: searchParams.get('style') || ''
  });

  useEffect(() => {
    async function load() {
      const params = new URLSearchParams();
      if (filter.category) params.set('category', filter.category);
      if (filter.style) params.set('style', filter.style);
      const url = '/api/products?' + params.toString();
      try {
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error('Error loading products', error);
      }
    }
    load();
  }, [filter]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Tienda</h1>
        <div className="flex gap-2">
          <select className="p-2 border rounded" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
            <option value="">Todas</option>
            <option value="vestidos">Vestidos</option>
            <option value="croptops">Croptops</option>
            <option value="jeans">Jeans</option>
            <option value="conjuntos">Conjuntos</option>
            <option value="faldas">Faldas</option>
            <option value="accesorios">Accesorios</option>
          </select>

          <select className="p-2 border rounded" value={filter.style} onChange={e => setFilter({ ...filter, style: e.target.value })}>
            <option value="">Todos los estilos</option>
            <option value="Elegante">Elegante</option>
            <option value="Gótico">Gótico</option>
            <option value="Coquette">Coquette</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p: any) => (
          <article key={p._id} className="bg-white rounded shadow p-3 hover:scale-105 transition">
            <Link href={`/productos/${p.slug}`}>
              <div className="w-full h-56 relative">
                <Image src={p.images?.[0] || '/logo.png'} alt={p.name} fill style={{ objectFit: 'cover' }} className="rounded" />
              </div>
              <h3 className="mt-2 font-medium">{p.name}</h3>
              <div className="text-sm text-gray-500">${p.price?.toFixed(2)}</div>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}

import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductosPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductContent />
    </Suspense>
  )
}

