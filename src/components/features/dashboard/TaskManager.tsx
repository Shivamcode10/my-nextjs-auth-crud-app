'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Task {
  _id: string;
  title: string;
  description?: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // 🔥 NEW: ROLE STATE
  const [role, setRole] = useState('');

  // ✅ FETCH USER ROLE
  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setRole(data.role);
      }
    } catch {
      console.log('Failed to fetch user');
    }
  };

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/v1/tasks', {
        credentials: 'include',
      });

      const data = await res.json();
      setTasks(data);
    } catch {
      setMessage('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUser(); // 🔥 ADD THIS
  }, []);

  // ✅ CREATE TASK
  const handleCreate = async () => {
    try {
      const res = await fetch('/api/v1/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Task created ✅');
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error: any) {
      setMessage(error.message || 'Error creating task');
    }
  };

  // ✅ EDIT
  const handleEdit = (task: Task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  // ✅ UPDATE TASK
  const handleUpdate = async () => {
    if (!editingTaskId) return;

    try {
      const res = await fetch(`/api/v1/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Task updated ✏️');
      setEditingTaskId(null);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error: any) {
      setMessage(error.message || 'Error updating task');
    }
  };

  // ✅ DELETE TASK
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Task deleted 🗑️');
      fetchTasks();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting task');
    }
  };

  return (
    <div className="mt-6 space-y-6">

      {/* 🔥 ROLE DISPLAY */}
      {role === 'admin' && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded font-medium">
           Admin Mode Enabled
        </div>
      )}

      {/* CREATE / UPDATE */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">
          {editingTaskId ? 'Update Task' : 'Create Task'}
        </h2>

        <div className="mt-4 space-y-3">
          <Input
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {editingTaskId ? (
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>Update</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingTaskId(null);
                  setTitle('');
                  setDescription('');
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleCreate}>Add Task</Button>
          )}
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <p className="text-green-600 text-sm">{message}</p>
      )}

      {/* TASK LIST */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Your Tasks</h2>

        {tasks.length === 0 && <p>No tasks yet</p>}

        <div className="mt-4 space-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="flex justify-between border p-2 rounded">
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleEdit(task)}>Edit</Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}