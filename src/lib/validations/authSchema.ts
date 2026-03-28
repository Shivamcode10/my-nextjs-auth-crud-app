import { z } from 'zod';

// ✅ Register Schema (UPDATED with role)
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .trim(),

  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),

  // 🔥 NEW FIELD (optional role)
  role: z
    .enum(['user', 'admin'])
    .optional()
    .default('user'),
});

// ✅ Login Schema (small improvement)
export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),

  password: z
    .string()
    .min(1, 'Password is required'),
});