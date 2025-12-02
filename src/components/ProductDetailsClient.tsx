'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { ShoppingBag, Heart, Minus, Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Product {
    _id: string
    name: string
    price: number
    description: string
    images: string[]
    sizes: string[]
    category: string
    style: string
    stock: number
}

export default function ProductDetailsClient({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '/logo.png')
    const [selectedSize, setSelectedSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [isWishlist, setIsWishlist] = useState(false)

    const add = useCartStore(s => s.add)

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes?.length > 0) {
            alert('Por favor selecciona una talla')
            return
        }
        add({
            id: product._id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            qty: quantity
        })
        // Optional: Show success toast
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
            {/* Image Gallery Section */}
            <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-lg">
                    <Image
                        src={selectedImage}
                        alt={product.name}
                        fill
                        className="object-cover animate-scale-in"
                        priority
                    />
                    {product.stock <= 3 && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md backdrop-blur-sm bg-opacity-90">
                            {product.stock === 0 ? 'Agotado' : '¡Últimas unidades!'}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {product.images?.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={`relative w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-purple-600 ring-2 ring-purple-100' : 'border-transparent hover:border-gray-300'
                                    }`}
                            >
                                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col space-y-8 pt-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-3">
                        <Link href="/productos" className="hover:underline">Tienda</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="capitalize">{product.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-end gap-4 mb-6">
                        <span className="text-3xl font-bold text-gray-900">
                            ${product.price?.toLocaleString('es-CO')}
                        </span>
                        {product.style && (
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-semibold rounded-full mb-1">
                                Estilo {product.style}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                    </p>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Selection Controls */}
                <div className="space-y-6">
                    {/* Sizes */}
                    {product.sizes?.length > 0 && (
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-gray-900">Seleccionar Talla</label>
                                <button className="text-sm text-purple-600 hover:underline">Guía de tallas</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all ${selectedSize === size
                                                ? 'bg-gray-900 text-white shadow-lg scale-110'
                                                : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div>
                        <label className="block font-semibold text-gray-900 mb-3">Cantidad</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.stock} unidades disponibles
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                    </button>

                    <button
                        onClick={() => setIsWishlist(!isWishlist)}
                        className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all ${isWishlist
                                ? 'border-red-500 bg-red-50 text-red-500'
                                : 'border-gray-200 hover:border-gray-900 text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        <Heart className={`w-6 h-6 ${isWishlist ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Envío gratis {'>'} $150.000
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Garantía de 30 días
                    </div>
                </div>
            </div>
        </div>
    )
}
