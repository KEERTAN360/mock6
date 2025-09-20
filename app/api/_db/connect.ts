

import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI ?? "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
.then(() => console.log("✅ Connected to MongoDB Atlas (tourist app DB)"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


