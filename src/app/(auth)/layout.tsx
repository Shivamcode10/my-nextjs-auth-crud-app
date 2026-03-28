// src/app/(auth)/layout.tsx
import { AuthLayout } from '@/components/features/auth/AuthLayout';

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout title="Welcome">{children}</AuthLayout>;
}