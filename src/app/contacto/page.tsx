'use client';
import { useState } from 'react';
import { contactSchema } from '@/lib/validations';
import { toast } from 'react-toastify';
import { Mail, User, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await contactSchema.validate(formData, { abortEarly: false });
            setErrors({});
            setLoading(true);

            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSent(true);
            toast.success('¡Mensaje enviado con éxito!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err: any) {
            const validationErrors: any = {};
            err.inner.forEach((error: any) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            toast.error('Por favor corrige los errores en el formulario');
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
                    <p className="text-gray-600 mb-8">
                        Gracias por contactarnos. Te responderemos pronto.
                    </p>
                    <button
                        onClick={() => setSent(false)}
                        className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Enviar otro mensaje
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] py-12 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Estamos aquí para ayudarte
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Contáctanos</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        ¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nombre
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                                            }`}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.name}
                                </p>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                                            }`}
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.email}
                                </p>}
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mensaje
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        required
                                        rows={5}
                                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                                            }`}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>
                                {errors.message && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {errors.message}
                                </p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Enviar mensaje
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Información de contacto</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-6 h-6 mt-1" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-purple-100">contacto@aura.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Horario de atención</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                                <p>Sábado: 10:00 AM - 4:00 PM</p>
                                <p>Domingo: Cerrado</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border-2 border-purple-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">¿Necesitas ayuda inmediata?</h3>
                            <p className="text-gray-600 mb-4">
                                Visita nuestra sección de preguntas frecuentes o chatea con nosotros.
                            </p>
                            <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
                                Ver FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
