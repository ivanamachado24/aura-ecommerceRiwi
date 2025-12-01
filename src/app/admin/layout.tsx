import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Image from 'next/image'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions as any);
  if (!session || (session as any).user.role !== 'admin') {
    return <div className="max-w-2xl mx-auto p-6">Acceso denegado. Debes ser admin.</div>
  }

  return (
    <div className="min-h-screen">
      <aside className="w-full bg-[#1B1B1B] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Image src="/logo.png" alt="Aura Admin" width={48} height={48} />

          <div>
            <div className="font-semibold">Aura Admin</div>
            <div className="text-xs">By V.M</div>
          </div>
          <nav className="ml-auto flex gap-3">
            <Link href="/admin" className="px-3 py-1 bg-lila text-black rounded">Dashboard</Link>
            <Link href="/admin/products" className="px-3 py-1 border rounded">Productos</Link>
          </nav>
        </div>
      </aside>

      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
