import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string; // bcrypt hashed
  role?: 'admin'|'customer';
}

const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

