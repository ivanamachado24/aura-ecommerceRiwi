import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
    productId: string;
    name: string;
    price: number;
    size?: string;
    quantity: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
    updatedAt: Date;
}

const CartItemSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String },
    quantity: { type: Number, required: true, min: 1 }
});

const CartSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
