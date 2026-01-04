'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Database of Users
    // In a real app, you would call /api/auth/login
    if (email === 'admin@yhills.com' && password === 'admin123') {
      // Set a fake cookie/session in localStorage for this demo
      const user = { name: 'Admin User', email, role: 'super_admin', token: 'mock-jwt-token' };
      localStorage.setItem('user_session', JSON.stringify(user));
      router.push('/dashboard');
    } else if (email === 'editor@yhills.com' && password === 'editor123') {
      // A non-super admin (won't see the onboarding button)
      const user = { name: 'Editor User', email, role: 'editor', token: 'mock-jwt-token' };
      localStorage.setItem('user_session', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Yhills Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border p-2 rounded"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border p-2 rounded"
              required 
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-xs text-gray-500 border-t pt-2">
          <p><strong>Demo Admin:</strong> admin@yhills.com / admin123</p>
          <p><strong>Demo Editor:</strong> editor@yhills.com / editor123</p>
        </div>
      </div>
    </div>
  );
}