import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight, Star, TrendingUp } from 'lucide-react'

export default function Home() {
  const styles = ['Elegante', 'Gótico', 'Coquette'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-12 mb-12 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white animate-fade-in">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Nueva Colección 2024
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Bienvenida a Aura
            </h1>
            <p className="text-xl text-purple-100 max-w-lg">
              Moda · Belleza · Autenticidad — Encuentra tu estilo: Elegante, Gótico o Coquette
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href="/productos"
                className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Explorar colecciones
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/productos?style=Coquette"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Explora tu estilo
              </Link>
            </div>
          </div>
          <div className="relative w-80 h-80 animate-bounce-subtle">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
            <Image
              src="/logo.png"
              alt="Aura hero"
              fill
              style={{ objectFit: 'contain' }}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="mb-12 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Nuevas colecciones</h2>
          <Link href="/productos" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 group">
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/productos" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 card-hover shadow-md">
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Nuevo
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Colección Premium</h3>
            </div>
            <p className="text-gray-600 mb-4">Descubre las últimas tendencias en moda</p>
            <div className="text-purple-600 font-semibold flex items-center gap-2">
              Explorar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 shadow-md card-hover">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-pink-600" />
              <h3 className="text-xl font-bold text-gray-900">Tendencias</h3>
            </div>
            <p className="text-gray-600 mb-4">Lo más popular de la temporada</p>
            <div className="text-pink-600 font-semibold">Próximamente</div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-8 shadow-md card-hover">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Exclusivos</h3>
            </div>
            <p className="text-gray-600 mb-4">Piezas únicas y limitadas</p>
            <div className="text-purple-600 font-semibold">Próximamente</div>
          </div>
        </div>
      </section>

      {/* Explore Styles */}
      <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Explora tu estilo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <Link
              key={style}
              href={`/productos?style=${style}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md card-hover p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{style}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {style === 'Elegante' && 'Sofisticación y clase'}
                  {style === 'Gótico' && 'Misterio y personalidad'}
                  {style === 'Coquette' && 'Dulzura y encanto'}
                </p>
                <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                  Ver colección
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}