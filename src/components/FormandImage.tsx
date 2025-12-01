"use client";

import { useState } from "react";
import { createProduct } from "@/services/product";

export default function NewProductPage() {
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await createProduct(formData);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <input name="title" placeholder="Título" className="border p-2" />

      <input name="description" placeholder="Descripción" className="border p-2" />

      <input name="category" placeholder="Categoría" className="border p-2" />

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
