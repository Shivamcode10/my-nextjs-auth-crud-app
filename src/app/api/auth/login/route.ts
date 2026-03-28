// src/app/api/auth/login/route.ts
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/lib/validations/authSchema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);
    console.log(`[DEBUG] Login attempt for email: ${email}`);
    console.log(`[DEBUG] Password length from request: ${password.length}`);

    await connectDB();
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`[DEBUG] User not found.`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log(`[DEBUG] User found. Stored password hash starts with: ${user.password.substring(0, 20)}...`);
    console.log(`[DEBUG] Comparing provided password with stored hash...`);

    // This is the critical line
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`[DEBUG] bcrypt.compare result: ${isMatch}`);

    if (!isMatch) {
      console.log(`[DEBUG] Passwords do not match.`);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log(`[DEBUG] Credentials are valid. Proceeding with token creation.`);
    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role || 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

     const response = NextResponse.json({ message: 'Login successful',token,},{ status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // <-- THE FIX
      maxAge: 3600,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('--- LOGIN ERROR ---');
    console.error(error);
    console.error('--- END LOGIN ERROR ---');

    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
  }
}