"use server";
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;


// Global cached connection to avoid multiple connections during hot reloads
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    // Reuse existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    // Create connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    });
  }

  // Wait for the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

