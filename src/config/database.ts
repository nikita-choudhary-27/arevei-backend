import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    // if (!process.env.MONGO_URL) {
    //   throw new Error("MONGO_URL is not defined in environment variables");
    // }

    await mongoose.connect("mongodb://localhost:27017/auth_db");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);

  }
};
