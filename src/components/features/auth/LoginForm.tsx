'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginSchema } from '@/lib/validations/authSchema';
import { z } from 'zod';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('[CLIENT] Login process started.');

    try {
      console.log('[CLIENT] Validating form data...');
      loginSchema.parse({ email, password });
      console.log('[CLIENT] Form data is valid.');

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('[CLIENT] Fetch response received.');
      console.log('[CLIENT] Response status:', res.status);
      console.log('[CLIENT] Response ok:', res.ok);
      console.log('[CLIENT] Response headers:', res.headers);

      const data = await res.json();
      console.log('[CLIENT] Response body parsed:', data);

      if (!res.ok) {
        console.log('[CLIENT] Response was NOT ok. Throwing error.');
        throw new Error(data.message || 'Login failed');
      }

      console.log('[CLIENT] Response was ok. Redirecting to /dashboard...');
      window.location.href = '/dashboard';
      
    } catch (err: any) {
      console.error('[CLIENT] An error occurred in the login try/catch block:', err);

      if (err instanceof z.ZodError) {
        // ✅ FIX: use "issues" instead of "error"
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
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
        {isLoading ? 'Logging in...' : 'Sign in'}
      </Button>
    </form>
  );
};