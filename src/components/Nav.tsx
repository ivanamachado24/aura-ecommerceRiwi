'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

export default function Nav() {
  const path = usePathname();
  const { data: session } = useSession();
  const { items, fetchCart } = useCartStore();

  useEffect(() => {
    if (session) {
      fetchCart();
    }
  }, [session, fetchCart]);

  const cartItemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="glass sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all">
            <Image src="/logo.png" alt="Aura" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div className="font-serif text-2xl gradient-text font-bold">Aura</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              By V.M
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/productos"
            className={`px-4 py-2 rounded-lg transition-smooth font-medium ${path?.startsWith('/productos')
                ? 'bg-gradient-primary text-white shadow-md'
                : 'hover:bg-purple-50 text-gray-700'
              }`}
          >
            Tienda
          </Link>
          <Link href="/sobre" className="px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700 transition-smooth font-medium">
            Sobre
          </Link>
          <Link href="/contacto" className="px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700 transition-smooth font-medium">
            Contacto
          </Link>

          <Link href="/cart" className="relative px-4 py-2 rounded-lg hover:bg-purple-50 text-gray-700 transition-smooth">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-scale-in">
                {cartItemCount}
              </span>
            )}
          </Link>

          {session ? (
            <>
              <Link href="/admin" className="px-4 py-2 rounded-lg bg-gradient-primary text-white shadow-md hover:shadow-lg transition-smooth flex items-center gap-2 font-medium">
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-smooth flex items-center gap-2 text-gray-700 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-smooth flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-4 h-4" />
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
