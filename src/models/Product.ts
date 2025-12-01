import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'vestidos' | 'croptops' | 'conjuntos' | 'jeans' | 'faldas' | 'accesorios';

  style: 'Elegante' | 'Gótico' | 'Coquette';
  sizes: string[];
  images: string[]; // rutas en public o urls
  stock: number;
  active: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  style: { type: String, required: true },
  sizes: { type: [String], default: [] },
  images: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
