'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Nav() {
  const path = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Aura" width={56} height={56} className="rounded-md" />
          <div>
            <div className="font-serif text-2xl text-morado">Aura</div>
            <div className="text-xs text-gray-500">By V.M</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/productos" className={`px-3 py-2 rounded ${path?.startsWith('/productos') ? 'bg-lila/40' : ''}`}>Tienda</Link>
          <Link href="/sobre" className="px-3 py-2 rounded">Sobre</Link>
          <Link href="/contacto" className="px-3 py-2 rounded">Contacto</Link>
          <Link href="/cart" className="px-3 py-2 rounded">Carrito</Link>
          {session ? (
            <>
              <Link href="/admin" className="px-3 py-2 rounded bg-morado text-white">Admin</Link>
              <button onClick={() => signOut()} className="px-3 py-2 rounded border">Salir</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 rounded border">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
