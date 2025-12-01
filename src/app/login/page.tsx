'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const router = useRouter();

  async function submit(e: any){
    e.preventDefault();
    const res = await signIn('credentials', { redirect: false, email, password });
    if (res?.ok) router.push('/');
    else alert('Credenciales inválidas');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Entrar</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" />
        <button className="w-full px-4 py-2 rounded bg-morado text-white">Entrar</button>
      </form>
    </div>
  )
}
