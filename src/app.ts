import express from "express";
import cors from "cors"; // Import cors
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();


app.use(
  cors({
    origin: [
      "https://arevei-lovat.vercel.app/",
      "https://arevei-backend.vercel.app",
    ], // Adjust as needed
    credentials: true,
  })
);

app.use(json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;