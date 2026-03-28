'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const Sidebar = () => {
  const pathname = usePathname();

  const [role, setRole] = useState('');

  // 🔥 FETCH USER ROLE
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.role) {
          setRole(data.role);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">MyApp</div>

      <nav className="flex-1">
        <ul>

          {/* ✅ DASHBOARD */}
          <li className="mb-2">
            <Link
              href="/dashboard"
              className={`block py-2 px-4 rounded ${
                pathname === '/dashboard'
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
          </li>

          {/* 🔥 ADMIN PANEL (ONLY ADMIN) */}
          {role === 'admin' && (
            <li className="mb-2">
              <Link
                href="/dashboard/admin"
                className={`block py-2 px-4 rounded ${
                  pathname === '/dashboard/admin'
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                Admin Panel 
              </Link>
            </li>
          )}

        </ul>
      </nav>

      <Button onClick={handleLogout} variant="secondary" className="w-full">
        Logout
      </Button>
    </aside>
  );
};