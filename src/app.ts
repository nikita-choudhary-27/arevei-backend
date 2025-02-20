import express from "express";
import cors from "cors"; // Import cors
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors()); // Use cors middleware here
app.use(json());
app.use("/api/auth", authRoutes);

export default app;