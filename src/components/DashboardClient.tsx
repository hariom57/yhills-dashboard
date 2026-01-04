'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DashboardClient({ initialData }: { initialData: any[] }) {
  
  // Debug: Log to see if data is actually arriving
  console.log("Dashboard Client Data:", initialData);

  // Prepare chart data
  const chartData = initialData.slice(0, 5).map((p) => ({
    name: p.name.substring(0, 10),
    sales: p.sales || 0,
    stock: p.stock
  }));

  const totalRevenue = initialData.reduce((acc, p) => acc + (p.price * (p.sales || 0)), 0);

  // 1. If no data, show a clear message
  if (!initialData || initialData.length === 0) {
    return (
      <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-xl font-bold text-yellow-800">No Data Found</h2>
        <p>Visit <code>/api/seed</code> to populate the database.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-500 uppercase font-bold">Total Revenue</div>
                <div className="text-3xl font-bold text-indigo-600 mt-2">${totalRevenue.toFixed(2)}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="text-sm text-slate-500 uppercase font-bold">Total Products</div>
                <div className="text-3xl font-bold text-indigo-600 mt-2">{initialData.length}</div>
            </div>
        </div>

        {/* CHART CONTAINER */}
        {/* We add 'bg-indigo-50' so if the chart breaks, you see a blue box instead of nothing */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border border-indigo-200">
            <h2 className="font-bold text-lg mb-6 text-slate-800">Sales Performance</h2>
            
            <div className="w-full">
                {/* CRITICAL FIX: We set height={400} directly as a number, not relying on CSS */}
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                        />
                        <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
}