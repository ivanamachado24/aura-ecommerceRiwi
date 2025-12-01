import Image from 'next/image'
import axios from 'axios';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product;
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products/${slug}`);
    product = res.data;
  } catch (error) {
    notFound();
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded shadow p-4">
        <div className="w-full h-[480px] relative">
          <Image src={product.images?.[0] || '/logo.png'} alt={product.name} fill style={{ objectFit: 'cover' }} className="rounded" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-serif text-morado mb-2">{product.name}</h1>
        <div className="text-2xl font-semibold mb-4">${product.price?.toFixed(2)}</div>
        <p className="mb-4 text-gray-700">{product.description}</p>
      </div>
    </div>
  )
}
