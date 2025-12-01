'use client';
import { useState } from 'react';
import Button from '@/components/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de envío real
        setSent(true);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif text-morado mb-6">Contáctanos</h1>

            {sent ? (
                <div className="bg-green-100 text-green-800 p-4 rounded">
                    ¡Gracias por tu mensaje! Te responderemos pronto.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full p-2 border rounded"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mensaje</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full p-2 border rounded"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <Button label="Enviar mensaje" type="submit" />
                </form>
            )}
        </div>
    );
}
