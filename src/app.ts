import express from "express";
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(json());
app.use("/api/auth", authRoutes);

export default app;
