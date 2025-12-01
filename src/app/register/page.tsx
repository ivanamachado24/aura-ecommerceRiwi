'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'



export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', { email, password, name })
      alert('Registrado. Ya puedes ingresar.')
      router.push('/login')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Crear cuenta</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border rounded" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" />
        <button className="w-full px-4 py-2 rounded bg-morado text-white">Crear</button>
      </form>
    </div>
  )
}

//pruebas
export function Demo() {
  const handleClick = () => alert('Clicked!')
  return <Button label="Click me" onClick={handleClick} />
}

