'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/lib/validations'
import { toast } from 'react-toastify'
import { User, Mail, Lock, UserPlus, Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()

    try {
      await registerSchema.validate({ email, password, name }, { abortEarly: false })
      setErrors({})
      setLoading(true)

      await axios.post('/api/auth/register', { email, password, name })
      toast.success('¡Cuenta creada con éxito! Ya puedes iniciar sesión.')
      router.push('/login')
    } catch (err: any) {
      if (err.inner) {
        const validationErrors: any = {}
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message
        })
        setErrors(validationErrors)
        toast.error('Por favor corrige los errores en el formulario')
      } else {
        toast.error(err?.response?.data?.message || 'Error al crear la cuenta')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Únete a Aura
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Comienza tu viaje de estilo con nosotros</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <form onSubmit={submit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                    }`}
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
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                    }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email}
              </p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl transition-all focus:ring-2 focus:ring-purple-200 ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                    }`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.password}
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
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Crear cuenta
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
