// src/models/Product.ts
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sales: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation in hot-reload (common Next.js fix)
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);