// src/app/api/v1/admin/users/route.ts

import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await verifyToken(request);

  // 🔥 ADMIN CHECK
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  await connectDB();

  const users = await User.find().select('-password');

  return NextResponse.json(users);
}