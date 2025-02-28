"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import cors
const body_parser_1 = require("body-parser");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://arevei-lovat.vercel.app", // Your deployed frontend
    "http://localhost:5173", // Local development
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // Needed if using authentication (cookies, JWT, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Other middleware (body-parser, routes, etc.)
app.use(express_1.default.json());
app.use((0, body_parser_1.json)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
exports.default = app;
