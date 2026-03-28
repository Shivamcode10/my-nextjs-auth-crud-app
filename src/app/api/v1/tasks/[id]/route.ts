import connectDB from '@/lib/connectDB';
import Task from '@/models/Task';
import { verifyToken } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';

// 🔥 UPDATE TASK
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  const user = await verifyToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params; // ✅ FIX

  try {
    const body = await request.json();

    await connectDB();

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: user.userId },
      body,
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);

  } catch (error) {
    return NextResponse.json({ message: 'Error updating task' }, { status: 500 });
  }
}

// 🔥 DELETE TASK
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  const user = await verifyToken(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params; // ✅ FIX

  try {
    await connectDB();

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });

  } catch (error) {
    return NextResponse.json({ message: 'Error deleting task' }, { status: 500 });
  }
}