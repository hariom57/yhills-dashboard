import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  await connectToDatabase();

  // Optional: Clear old data
  // await Product.deleteMany({});

  // Dummy Data with Sales so the chart works
  const dummyProducts = [
    { name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, sales: 120, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { name: 'Smart Watch Gen 5', category: 'Electronics', price: 199.50, stock: 12, sales: 85, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { name: 'Running Shoes', category: 'Apparel', price: 65.00, stock: 150, sales: 210, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { name: 'Ergonomic Chair', category: 'Furniture', price: 249.00, stock: 5, sales: 15, imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500' },
    { name: 'Mechanical Keyboard', category: 'Electronics', price: 120.00, stock: 30, sales: 60, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500' },
  ];

  await Product.insertMany(dummyProducts);

  return NextResponse.json({ message: 'Database seeded with demo data!' });
}


//Action: Visit http://localhost:3000/api/seed in your browser once. It will add these products. Then refresh your Dashboard.