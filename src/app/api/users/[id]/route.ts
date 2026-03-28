// src/app/api/users/[id]/route.ts
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// ✅ GET a single user by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params; // 🔥 FIX

    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the user.' },
      { status: 500 }
    );
  }
}

// ✅ PUT to update a user by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params; // 🔥 FIX
    const body = await req.json();
    const { name, email } = body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while updating the user.' },
      { status: 500 }
    );
  }
}