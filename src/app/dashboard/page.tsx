import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import DashboardClient from '@/components/DashboardClient';

export default async function Dashboard() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    const serializedData = JSON.parse(JSON.stringify(products));
    
    // Debug Log: Check terminal for this output
    console.log("Dashboard Server: Fetching", serializedData.length, "products");

    return <DashboardClient initialData={serializedData} />;
  } catch (error) {
    return (
      <div className="p-8 text-red-500">
        Error connecting to database: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
}