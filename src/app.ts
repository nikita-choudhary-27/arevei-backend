import express from "express";
import cors from "cors"; // Import cors
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();

app.use(cors()); // Use cors middleware here
app.use(json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;