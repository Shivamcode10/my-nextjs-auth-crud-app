// src/app/api/v1/admin/users/[id]/route.ts

import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyToken(request);

  // 🔥 ADMIN CHECK
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  await connectDB();

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'User deleted successfully' });
}