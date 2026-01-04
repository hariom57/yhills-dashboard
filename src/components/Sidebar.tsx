'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for session
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user_session');
      if (!session && pathname !== '/login') {
        router.replace('/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    router.replace('/login');
  };

  // Don't render nav if on login page
  if (pathname === '/login') return null;

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center justify-center border-b border-slate-700 font-bold text-xl">
        Yhills Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {[
          { name: 'Dashboard', href: '/dashboard', icon: '📊' },
          { name: 'Products', href: '/products', icon: '📦' },
          { name: 'Settings', href: '/settings', icon: '⚙️' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              pathname === item.href ? 'bg-indigo-600' : 'hover:bg-slate-800'
            }`}
          >
            <span>{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button onClick={handleLogout} className="w-full text-left text-sm text-red-400 hover:text-red-300">
          Logout
        </button>
      </div>
    </aside>
  );
}