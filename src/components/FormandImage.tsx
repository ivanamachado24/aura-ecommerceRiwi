"use client";

import { useState } from "react";
import { createProduct } from "@/services/product";
import { productFormSchema } from "@/lib/validations";
import { toast } from "react-toastify";

export default function NewProductPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formValues = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
    };

    try {
      await productFormSchema.validate(formValues, { abortEarly: false });
      setErrors({});

      const res = await createProduct(formData);
      if (res) {
        toast.success('¡Producto creado con éxito!');
        form.reset();
        setImagePreview('');
      } else {
        toast.error('Error al crear producto');
      }
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      toast.error('Por favor corrige los errores en el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <div>
        <input
          name="title"
          placeholder="Título"
          className={`border p-2 w-full ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <input
          name="description"
          placeholder="Descripción"
          className={`border p-2 w-full ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <input
          name="category"
          placeholder="Categoría"
          className={`border p-2 w-full ${errors.category ? 'border-red-500' : ''}`}
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      {/* Imagen */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImagePreview(URL.createObjectURL(file));
        }}
      />

      {imagePreview && (
        <img src={imagePreview} alt="preview" className="w-40 rounded" />
      )}

      <button type="submit" className="bg-black text-white p-2 rounded">
        Crear producto
      </button>
    </form>
  );
}
