'use client'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function NewProduct(){
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data: any){
    data.images = data.images ? [data.images] : [];
    await axios.post('/api/products', data);
    router.push('/admin/products');
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Nuevo producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name')} placeholder="Nombre" className="w-full p-2 border rounded" />
        <input {...register('slug')} placeholder="slug (sin espacios)" className="w-full p-2 border rounded" />
        <input {...register('price')} placeholder="Precio" type="number" className="w-full p-2 border rounded" />
        <select {...register('category')} className="w-full p-2 border rounded">
          <option value="vestidos">Vestidos</option>
          <option value="croptops">Croptops</option>
          <option value="conjuntos">Conjuntos</option>
          <option value="accesorios">Accesorios</option>
        </select>
        <select {...register('style')} className="w-full p-2 border rounded">
          <option value="Elegante">Elegante</option>
          <option value="Gótico">Gótico</option>
          <option value="Coquette">Coquette</option>
        </select>
        <input {...register('sizes')} placeholder="Tallas separadas por coma (S,M,L)" className="w-full p-2 border rounded" />
        <input {...register('stock')} placeholder="Stock" type="number" className="w-full p-2 border rounded" />
        <input {...register('images')} placeholder="Ruta imagen (public/...)" className="w-full p-2 border rounded" />
        <textarea {...register('description')} placeholder="Descripción" className="w-full p-2 border rounded" />
        <div>
          <button className="px-4 py-2 rounded bg-morado text-white">Crear</button>
        </div>
      </form>
    </div>
  )
}
