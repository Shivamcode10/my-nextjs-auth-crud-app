// src/app/api/auth/register/route.ts

import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { registerSchema } from '@/lib/validations/authSchema';

export async function POST(req: Request) {
  try {
    // ✅ 1. Safely read raw body
    const text = await req.text();

    if (!text) {
      return NextResponse.json(
        { message: 'Request body is empty' },
        { status: 400 }
      );
    }

    // ✅ 2. Parse JSON safely
    let body;
    try {
      body = JSON.parse(text);
    } catch (err) {
      return NextResponse.json(
        { message: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // ✅ 3. Validate
    const { name, email, password, role } = registerSchema.parse(body);

    // ✅ 4. Connect DB
    await connectDB();

    // ✅ 5. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // ✅ 6. Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    // ✅ 7. Remove password
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
        { message: 'Invalid input', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}