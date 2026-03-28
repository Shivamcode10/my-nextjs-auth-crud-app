// src/app/api/users/[id]/route.ts
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

// GET a single user by ID
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    const user = await User.findById(params.id).select('-password'); // Exclude password

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while fetching the user.' }, { status: 500 });
  }
}

// PUT to update a user by ID
export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email } = body;

    // You can add more validation here using Zod if needed

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { name, email },
      { new: true, runValidators: true } // Return the updated document
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while updating the user.' }, { status: 500 });
  }
}