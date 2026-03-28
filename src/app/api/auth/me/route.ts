import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = await verifyToken(request as any);

  if (!user) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}