'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { registerSchema } from '@/lib/validations/authSchema';
import { z } from 'zod';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      registerSchema.parse({ name, email, password });

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      window.location.href = '/login';

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // ✅ FIX HERE
        setError(err.issues[0]?.message || 'Invalid input');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
      <Input
        type="text"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}