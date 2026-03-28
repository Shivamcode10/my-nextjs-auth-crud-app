import connectDB from '@/lib/connectDB';
import Task from '@/models/Task';
import { verifyToken } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';

// 🔥 CREATE TASK
export async function POST(request: NextRequest) {
  const user = await verifyToken(request); // ✅ FIXED

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description } = body;

    await connectDB();

    const task = await Task.create({
      title,
      description,
      userId: user.userId,
    });

    return NextResponse.json(task, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Error creating task' }, { status: 500 });
  }
}

// 🔥 GET ALL TASKS
export async function GET(request: NextRequest) {
  const user = await verifyToken(request); // ✅ FIXED

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const tasks = await Task.find({ userId: user.userId });

    return NextResponse.json(tasks);

  } catch (error) {
    return NextResponse.json({ message: 'Error fetching tasks' }, { status: 500 });
  }
}