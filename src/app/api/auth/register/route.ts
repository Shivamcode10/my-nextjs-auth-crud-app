import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { registerSchema } from '@/lib/validations/authSchema';

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse body
    const body = await req.json();

    // ✅ include role optionally
    const { name, email, password, role } = registerSchema.parse(body);

    // 2️⃣ Connect DB
    await connectDB();

    // 3️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    // 5️⃣ Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.issues }, // ✅ FIX HERE
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 }
    );
  }
}