import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

// This interface tells TypeScript that params is a Promise
interface RouteContext {
  params: Promise<{ id: string }>;
}

// Handle DELETE
export async function DELETE(req: Request, context: RouteContext) {
  // AWAIT the params before accessing id
  const { id } = await context.params; 
  
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting' }, { status: 500 });
  }
}

// Handle UPDATE (PUT)
export async function PUT(req: Request, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // This updates the product and returns the NEW version
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}