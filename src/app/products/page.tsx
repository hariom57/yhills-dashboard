'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import ProductForm from '@/components/ProductForm';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsPage() {
  const { data: products, error } = useSWR('/api/products', fetcher);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  if (error) return <div className="p-4 text-red-500">Failed to load products</div>;
  if (!products) return <div className="p-4">Loading products...</div>;

  const handleEdit = (product: any) => {
    console.log("Editing product:", product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product: any) => {
    const idToDelete = product._id || product.id;
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      const res = await fetch(`/api/products/${idToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        mutate('/api/products'); // Refresh list
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Network error while deleting');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    mutate('/api/products'); // Force refresh
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        <button 
          onClick={() => { setEditingProduct(null); setShowForm(true); }} 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition shadow-sm"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
           <ProductForm initialData={editingProduct} onSuccess={handleFormSuccess} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600 w-16">Image</th>
              <th className="p-4 font-semibold text-slate-600">Name</th>
              <th className="p-4 font-semibold text-slate-600">Price</th>
              <th className="p-4 font-semibold text-slate-600">Stock</th>
              <th className="p-4 font-semibold text-slate-600">Sales</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p: any) => (
              <tr key={p._id || p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="w-10 h-10 overflow-hidden rounded border border-slate-200 bg-slate-100">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-900">{p.name}</td>
                <td className="p-4 text-slate-600">${p.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-medium">{p.sales || 0}</td>
                <td className="p-4 text-right flex justify-end gap-3">
                  <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Edit</button>
                  <button onClick={() => handleDelete(p)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-12 text-center text-slate-500">No products found.</div>
        )}
      </div>
    </div>
  );
}