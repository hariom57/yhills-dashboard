'use client';

import { useState } from 'react';
import { uploadImage } from '@/app/actions/upload';
import { productSchema } from '@/validations/productSchema';

interface ProductFormProps {
  initialData?: any; 
  onSuccess?: () => void;
}

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const [step, setStep] = useState(1);
  const [imageUploading, setImageUploading] = useState(false);

  // ADD 'sales' to this state object
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || '',
    stock: initialData?.stock || '',
    sales: initialData?.sales || '', // <-- Added Sales
    imageUrl: initialData?.imageUrl || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUploading(true);
      const file = new FormData();
      file.append('file', e.target.files[0]);
      try {
        const url = await uploadImage(file) as string;
        setFormData({ ...formData, imageUrl: url });
      } catch (err) {
        console.error("Upload Error:", err);
        alert("Failed to upload image to Cloudinary.");
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.name) return alert("Product Name is required");
    if (step === 2 && (!formData.price || !formData.stock)) return alert("Price and Stock are required");
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const validatedData = productSchema.parse({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sales: Number(formData.sales) // Parse Sales as Number
      });

      const productId = initialData?._id || initialData?.id;
      const method = initialData ? 'PUT' : 'POST';
      const url = productId ? `/api/products/${productId}` : '/api/products';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Form Error:", error);
      alert("Please check your inputs and try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow border border-slate-200">
      {/* Wizard Steps Indicator */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
            step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="e.g. Wireless Headphones"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Next</button>
        </div>
      )}

      {/* Step 2: Inventory (Updated) */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="0"
            />
          </div>
          {/* ADDED SALES INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Sales (Units)</label>
            <input 
              type="number" 
              name="sales" 
              value={formData.sales} 
              onChange={handleChange} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">How many units have been sold?</p>
          </div>

          <div className="flex gap-2">
            <button onClick={handlePrev} className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">Back</button>
            <button onClick={handleNext} className="w-1/2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Next</button>
          </div>
        </div>
      )}

      {/* Step 3: Image Upload */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          
          <div 
            onClick={() => document.getElementById('file-upload')?.click()} 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${imageUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
              disabled={imageUploading}
            />
            {imageUploading ? (
              <p className="text-indigo-600 font-medium">Uploading to Cloudinary...</p>
            ) : (
              <div>
                <p className="text-gray-500">Click to upload image</p>
                <p className="text-xs text-gray-400">JPG, PNG, GIF</p>
              </div>
            )}
          </div>

          {formData.imageUrl && (
            <div className="flex flex-col items-center animate-in zoom-in">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-contain bg-gray-100 rounded border" />
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button onClick={handlePrev} className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">Back</button>
            <button onClick={handleSubmit} className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Save Product</button>
          </div>
        </div>
      )}
    </div>
  );
}