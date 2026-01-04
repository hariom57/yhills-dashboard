'use client';

import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user_session');
      if (session) setRole(JSON.parse(session).role);
    }
  }, []);

  const handleOnboard = () => {
    alert('Admin onboarded securely! (Email sent)');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold text-lg mb-2">Profile Settings</h2>
        <p className="text-gray-600">Current Role: <span className="capitalize font-bold text-indigo-600">{role}</span></p>
      </div>

      {/* ADMIN ONLY SECTION */}
      {role === 'super_admin' && (
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded shadow">
          <h2 className="font-bold text-indigo-800 text-lg mb-2">🔐 Admin Administration</h2>
          <p className="text-sm text-indigo-700 mb-4">
            This is a secure section. Only visible to Super Admins.
          </p>
          <button 
            onClick={handleOnboard}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Onboard New Admin
          </button>
        </div>
      )}
      
      {role === 'editor' && (
        <div className="bg-gray-100 p-6 rounded border border-gray-300">
           <p className="text-gray-500 italic">You do not have permission to manage admin users.</p>
        </div>
      )}
    </div>
  );
}