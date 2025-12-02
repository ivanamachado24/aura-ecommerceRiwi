'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import {
    Upload,
    X,
    Image as ImageIcon,
    Package,
    DollarSign,
    Tag,
    Sparkles,
    Loader2,
    Check,
    ArrowLeft,
    Trash2
} from 'lucide-react'

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const slug = params.slug as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<string[]>([])
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        category: 'vestidos',
        style: 'Elegante',
        stock: '',
        sizes: [] as string[],
    })

    const categories = [
        { value: 'vestidos', label: 'Vestidos' },
        { value: 'croptops', label: 'Crop Tops' },
        { value: 'conjuntos', label: 'Conjuntos' },
        { value: 'jeans', label: 'Jeans' },
        { value: 'faldas', label: 'Faldas' },
        { value: 'accesorios', label: 'Accesorios' },
    ]

    const styles = [
        { value: 'Elegante', label: 'Elegante', color: 'purple' },
        { value: 'Gótico', label: 'Gótico', color: 'gray' },
        { value: 'Coquette', label: 'Coquette', color: 'pink' },
    ]

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    // Load product data
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await fetch(`/api/products/${slug}`)
                if (!response.ok) {
                    throw new Error('Producto no encontrado')
                }
                const product = await response.json()

                setFormData({
                    name: product.name,
                    slug: product.slug,
                    description: product.description || '',
                    price: product.price.toString(),
                    category: product.category,
                    style: product.style,
                    stock: product.stock.toString(),
                    sizes: product.sizes || [],
                })

                setExistingImages(product.images || [])
                setLoading(false)
            } catch (error) {
                console.error('Error loading product:', error)
                toast.error('Error al cargar el producto')
                router.push('/admin/products')
            }
        }

        loadProduct()
    }, [slug, router])

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setFormData({
            ...formData,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        })
    }

    // Handle new image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} es demasiado grande (máx 5MB)`)
                return false
            }
            return true
        })

        if (validFiles.length > 0) {
            setImages(prev => [...prev, ...validFiles])

            validFiles.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    // Remove new image
    const removeNewImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    // Remove existing image
    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index))
    }

    // Toggle size selection
    const toggleSize = (size: string) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }))
    }

    // Delete product
    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return
        }

        setDeleting(true)
        try {
            const response = await fetch(`/api/products/${slug}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                toast.success('Producto eliminado exitosamente')
                router.push('/admin/products')
            } else {
                toast.error('Error al eliminar producto')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al eliminar producto')
        } finally {
            setDeleting(false)
        }
    }

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.slug || !formData.price || !formData.stock) {
            toast.error('Por favor completa todos los campos requeridos')
            return
        }

        if (existingImages.length === 0 && images.length === 0) {
            toast.error('Por favor mantén o sube al menos una imagen')
            return
        }

        if (formData.sizes.length === 0) {
            toast.error('Por favor selecciona al menos una talla')
            return
        }

        setSaving(true)

        try {
            // If there are new images to upload
            if (images.length > 0) {
                const uploadData = new FormData()

                // Append all form fields
                uploadData.append('name', formData.name)
                uploadData.append('slug', formData.slug)
                uploadData.append('description', formData.description)
                uploadData.append('price', formData.price)
                uploadData.append('category', formData.category)
                uploadData.append('style', formData.style)
                uploadData.append('stock', formData.stock)
                uploadData.append('sizes', formData.sizes.join(','))
                uploadData.append('existingImages', JSON.stringify(existingImages))

                // Append new images
                images.forEach(image => {
                    uploadData.append('images', image)
                })

                const response = await fetch(`/api/products/${slug}`, {
                    method: 'PUT',
                    body: uploadData,
                })

                const result = await response.json()

                if (response.ok) {
                    toast.success('¡Producto actualizado exitosamente!')
                    router.push('/admin/products')
                } else {
                    toast.error(result.error || 'Error al actualizar producto')
                }
            } else {
                // No new images, just update with JSON
                const updateData = {
                    name: formData.name,
                    slug: formData.slug,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    style: formData.style,
                    stock: parseInt(formData.stock),
                    sizes: formData.sizes,
                    images: existingImages,
                }

                const response = await fetch(`/api/products/${slug}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData),
                })

                const result = await response.json()

                if (response.ok) {
                    toast.success('¡Producto actualizado exitosamente!')
                    router.push('/admin/products')
                } else {
                    toast.error(result.error || 'Error al actualizar producto')
                }
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al actualizar producto')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando producto...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <button
                        onClick={() => router.push('/admin/products')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver a productos
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            Panel de Administración
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                            Editar Producto
                        </h1>
                        <p className="text-gray-600">Actualiza la información del producto</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
                    {/* Basic Information Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Información Básica</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nombre del Producto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    placeholder="Ej: Vestido Luna Elegante"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Slug (URL) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="vestido-luna-elegante"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all font-mono text-sm"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe el producto..."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Inventory Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Precio e Inventario</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Precio (COP) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="150000"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Stock Disponible <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="10"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category & Style Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                                <Tag className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Categoría y Estilo</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Categoría <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Style */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Estilo <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.style}
                                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    required
                                >
                                    {styles.map(style => (
                                        <option key={style.value} value={style.value}>{style.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Tallas Disponibles <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${formData.sizes.includes(size)
                                            ? 'bg-gradient-primary text-white shadow-md scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {size}
                                        {formData.sizes.includes(size) && (
                                            <Check className="w-4 h-4 inline ml-1" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Images Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Imágenes del Producto</h2>
                        </div>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Imágenes Actuales</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {existingImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img}
                                                alt={`Existing ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upload Zone */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-all">
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label htmlFor="images" className="cursor-pointer">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-semibold text-gray-700 mb-2">
                                    Agregar más imágenes
                                </p>
                                <p className="text-sm text-gray-500">
                                    PNG, JPG, WEBP (máx. 5MB por imagen)
                                </p>
                            </label>
                        </div>

                        {/* New Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Nuevas Imágenes</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`New ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting || saving}
                            className="px-6 py-4 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-5 h-5" />
                                    Eliminar
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/admin/products')}
                            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                            disabled={saving || deleting}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={saving || deleting}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Guardando cambios...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
