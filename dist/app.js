"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://arevei-lovat.vercel.app",
    "http://localhost:5173",
    "https://arevei-backend.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, body_parser_1.json)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
exports.default = app;
