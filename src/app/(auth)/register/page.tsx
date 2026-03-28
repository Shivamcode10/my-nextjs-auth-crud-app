// src/app/(auth)/register/page.tsx
import RegisterForm from '@/components/features/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </>
  );
}