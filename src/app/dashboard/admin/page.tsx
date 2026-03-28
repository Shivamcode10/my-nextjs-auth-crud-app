'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/admin/users', {
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUsers(data);
    } catch (error: any) {
      setMessage(error.message || 'Error loading users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ DELETE USER
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/admin/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage('User deleted 🗑️');
      fetchUsers();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting user');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel 👑</h1>

      {message && <p className="text-green-600">{message}</p>}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>

        {users.length === 0 && <p>No users found</p>}

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between border p-2 rounded"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>

              <Button
                variant="secondary"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}