// src/lib/connectDB.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global is used here to maintain a cached connection across hot reloads in development.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('=> Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('=> Creating new database connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('=> Database connection successful!');
        return mongoose;
      })
      .catch((error) => {
        console.error('=> Database connection FAILED!');
        console.error(error); // This will show the exact error
        cached.promise = null; // Reset promise on failure
        throw error;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    throw e;
  }

  return cached.conn;
}

export default connectDB;