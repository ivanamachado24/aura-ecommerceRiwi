'use client'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function CartPage() {
  const { data: session } = useSession();
  const items = useCartStore(s => s.items);
  const remove = useCartStore(s => s.remove);
  const fetchCart = useCartStore(s => s.fetchCart);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session, fetchCart]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Tu Carrito</h1>
        <p className="text-gray-600">
          {items.length === 0 ? 'Tu carrito está vacío' : `${items.length} ${items.length === 1 ? 'producto' : 'productos'} en tu carrito`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center animate-slide-up">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-600 mb-8">¡Descubre nuestros productos y comienza a comprar!</p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, index) => (
              <div
                key={it.id}
                className="bg-white rounded-2xl shadow-md p-6 animate-slide-up hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-6">
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{it.name}</h3>
                    {it.size && (
                      <p className="text-sm text-gray-500 mb-2">Talla: {it.size}</p>
                    )}
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-purple-600">${it.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">x {it.qty}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                      <p className="text-xl font-bold text-gray-900">${(it.price * it.qty).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-purple-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all mb-4">
                Proceder al pago
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/productos"
                className="block text-center text-purple-600 hover:text-purple-700 font-medium"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
