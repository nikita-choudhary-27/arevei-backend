import express from "express";
import cors from "cors"; // Import cors
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();


const allowedOrigins = [
  "https://arevei-lovat.vercel.app", // Your deployed frontend
  "http://localhost:5173", // Local development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Needed if using authentication (cookies, JWT, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Other middleware (body-parser, routes, etc.)
app.use(express.json());

app.use(json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;