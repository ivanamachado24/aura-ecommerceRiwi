import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-lila to-white rounded-lg p-8 mb-8 aura-glow">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-serif text-morado">Bienvenida a Aura</h1>
            <p className="mt-3 text-gray-700">Moda · Belleza · Autenticidad — Encuentra tu estilo: Elegante, Gótico o Coquette</p>
            <div className="mt-4 flex gap-3">
              <Link href="/productos" className="px-5 py-2 rounded bg-morado text-white">Explorar colecciones</Link>
              <Link href="/productos?style=Coquette" className="px-5 py-2 rounded border">Explora tu estilo</Link>
            </div>
          </div>
          <div className="w-56 h-56 relative">
            <Image src="/logo.png" alt="Aura hero" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Nuevas colecciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/productos" className="bg-white p-4 rounded shadow hover:scale-[1.01] transition">Ver colección</Link>
          <div className="bg-white p-4 rounded shadow">Look 2</div>
          <div className="bg-white p-4 rounded shadow">Look 3</div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Explora tu estilo</h2>
        <div className="flex gap-3">
          <Link href="/productos?style=Elegante" className="px-4 py-2 rounded bg-white shadow">Elegante</Link>
          <Link href="/productos?style=Gótico" className="px-4 py-2 rounded bg-white shadow">Gótico</Link>
          <Link href="/productos?style=Coquette" className="px-4 py-2 rounded bg-white shadow">Coquette</Link>
        </div>
      </section>
    </>
  )
}