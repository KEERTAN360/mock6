import mongoose from "mongoose"
export const runtime = "nodejs"

// Enhanced MongoDB connection with external access support
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mock5"

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined")
}

// Connection options for external access
const connectionOptions = {
  dbName: "mock5",
  // Enable connection pooling for better performance
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // Retry configuration
  retryWrites: true,
  retryReads: true,
  // Authentication options
  authSource: "mock5",
  // Connection timeout
  connectTimeoutMS: 10000,
}

let cached = (global as any)._mongoose

if (!cached) {
  cached = (global as any)._mongoose = { conn: null as any, promise: null as any }
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn as typeof mongoose
  
  if (!cached.promise) {
    console.log('🔌 Connecting to MongoDB...')
    console.log(`📍 Connection URI: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`) // Hide credentials in logs
    
    cached.promise = mongoose.connect(MONGODB_URI, connectionOptions as any)
      .then((conn) => {
        console.log('✅ MongoDB connected successfully')
        return conn
      })
      .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message)
        throw error
      })
  }
  
  cached.conn = await cached.promise
  return cached.conn as typeof mongoose
}


