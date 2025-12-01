import React from 'react';
import { Sparkles, Heart, Star, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Nuestra Historia
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Sobre Aura</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Donde la autenticidad se encuentra con el estilo
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Story Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-slide-up">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Nuestra Misión</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Bienvenida a <strong className="text-purple-600">Aura – By V.M</strong>, tu destino de moda donde la autenticidad se encuentra con el estilo.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Nuestra misión es empoderar a través de la moda, ofreciendo colecciones que van desde lo
                        <strong className="text-purple-600"> Elegante</strong> y sofisticado, pasando por lo misterioso del estilo <strong className="text-purple-600">Gótico</strong>,
                        hasta la dulzura del <strong className="text-purple-600">Coquette</strong>.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Creemos que cada prenda cuenta una historia, y queremos ser parte de la tuya.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Pasión</h3>
                        <p className="text-gray-600">
                            Amamos lo que hacemos y se refleja en cada pieza que ofrecemos.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Calidad</h3>
                        <p className="text-gray-600">
                            Seleccionamos cuidadosamente cada producto para garantizar excelencia.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Innovación</h3>
                        <p className="text-gray-600">
                            Siempre a la vanguardia de las últimas tendencias en moda.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 md:p-12 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <h2 className="text-3xl font-serif font-bold mb-4">¿Lista para encontrar tu estilo?</h2>
                    <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                        Explora nuestras colecciones y descubre piezas únicas que reflejan tu personalidad.
                    </p>
                    <a
                        href="/productos"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explorar colecciones
                    </a>
                </div>
            </div>
        </div>
    );
}
