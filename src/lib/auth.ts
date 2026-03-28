import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log('[VERIFY] Token received:', token ? 'YES' : 'NO');

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);

    console.log('[VERIFY] Token valid:', payload);

    return payload as {
      userId: string;
      name: string;
      role: string;
    };

  } catch (error) {
    console.log('[VERIFY] Token verification FAILED:', error);
    return null;
  }
}