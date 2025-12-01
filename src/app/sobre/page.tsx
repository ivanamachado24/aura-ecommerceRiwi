import React from 'react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif text-morado mb-6">Sobre Aura</h1>
            <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="mb-4 text-lg">
                    Bienvenida a <strong>Aura – By V.M</strong>, tu destino de moda donde la autenticidad se encuentra con el estilo.
                </p>
                <p className="mb-4">
                    Nuestra misión es empoderar a través de la moda, ofreciendo colecciones que van desde lo
                    <strong> Elegante</strong> y sofisticado, pasando por lo misterioso del estilo <strong>Gótico</strong>,
                    hasta la dulzura del <strong>Coquette</strong>.
                </p>
                <p>
                    Creemos que cada prenda cuenta una historia, y queremos ser parte de la tuya.
                </p>
            </div>
        </div>
    );
}
