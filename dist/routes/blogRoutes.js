"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = require("../contollers/BlogController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post("/", BlogController_1.createBlog);
router.get("/", BlogController_1.getAllBlogs);
router.get("/:id", authMiddleware_1.default, BlogController_1.getBlogById);
// router.post("/:id/like", auth, likeBlog);
router.post("/:id/comment", authMiddleware_1.default, BlogController_1.commentOnBlog);
exports.default = router;
