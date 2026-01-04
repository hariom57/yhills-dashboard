import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from 'next/navigation';
// We can't use localStorage/hook in server components directly for checking auth 
// without a middleware, but for this single-file demo, we will make the Sidebar handle the check
import Sidebar from "@/components/Sidebar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yhills Dashboard",
  description: "SSR Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}