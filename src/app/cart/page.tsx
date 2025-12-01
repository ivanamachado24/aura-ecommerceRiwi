'use client'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'

export default function CartPage(){
  const items = useCartStore(s=>s.items);
  const remove = useCartStore(s=>s.remove);
  const total = items.reduce((s,i)=>s + i.price * i.qty, 0);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
      {items.length === 0 ? <div>Carrito vacío. <Link href="/productos" className="text-morado">Ir a la tienda</Link></div> :
        <>
          <ul className="space-y-3">
            {items.map(it=>(
              <li key={it.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">Talla: {it.size || '—'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div>${(it.price * it.qty).toFixed(2)}</div>
                  <button onClick={()=>remove(it.id)} className="px-2 py-1 border rounded">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
            <button className="px-4 py-2 rounded bg-morado text-white">Comprar</button>
          </div>
        </>
      }
    </div>
  )
}
