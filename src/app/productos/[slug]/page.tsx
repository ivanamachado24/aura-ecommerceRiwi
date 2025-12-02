import axios from 'axios';
import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetailsClient';

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
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsClient product={product} />
    </div>
  )
}
