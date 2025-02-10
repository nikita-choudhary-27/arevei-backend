import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
