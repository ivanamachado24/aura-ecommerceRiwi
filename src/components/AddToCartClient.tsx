'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'

export default function AddToCartClient({ product }: any) {
  const [size, setSize] = useState(product.sizes?.[0] || '');
  const add = useCartStore(s => s.add);
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm">Talla</label>
        <select value={size} onChange={e=>setSize(e.target.value)} className="block p-2 border rounded mt-1">
          {product.sizes?.map((s:string)=> <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button onClick={()=>add({ id: product._id, name: product.name, price: product.price, size, qty: 1 })} className="px-4 py-2 rounded bg-morado text-white">Agregar al carrito</button>
    </div>
  )
}
