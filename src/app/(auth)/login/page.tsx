// src/app/(auth)/login/page.tsx
import { LoginForm } from '@/components/features/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Dont have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </Link>
      </p>
    </>
  );
}