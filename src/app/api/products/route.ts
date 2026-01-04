import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { productSchema } from '@/validations/productSchema';

// --- GET: Fetch all products ---
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// --- POST: Create a new product ---
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Validate with Zod
    const validation = productSchema.safeParse(body);
    
    if (!validation.success) {
      // FIX: Explicitly handle the error to satisfy strict TypeScript
      const errorMessages = validation.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message
      }));
      
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    const product = await Product.create(validation.data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}