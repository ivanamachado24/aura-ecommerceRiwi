import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Providers from '@/components/Providers'
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Aura – By V.M',
  description: 'Boutique Aura – moda, belleza y autenticidad',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#F7F3FF] text-[#1B1B1B]">
        <Providers>
          <Nav />
          <main className="max-w-6xl mx-auto px-4 py-6">
            {children}
          </main>
          <ToastContainer position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}

