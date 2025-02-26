import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    // if (!process.env.MONGO_URL) {
    //   throw new Error("MONGO_URL is not defined in environment variables");
    // }

    await mongoose.connect(
      "mongodb+srv://nikita:OiP7gMU9h4hiQtya@arevei-page.kxhfo.mongodb.net/"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);

  }
};
