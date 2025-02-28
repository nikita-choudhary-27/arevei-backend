import express from "express";
import cors from "cors"; 
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();


const allowedOrigins = [
  "https://arevei-lovat.vercel.app",
  "http://localhost:5173",
  "https://arevei-backend.vercel.app",
];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);




app.use(json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;