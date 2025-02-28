"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    const newBlog = new Blog_1.default({ title, content, author });
    yield newBlog.save();
    res.status(201).json(newBlog);
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield Blog_1.default.find();
    res.status(200).json(blogs);
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBlogById = getBlogById;
// export const likeBlog = async (req: AuthRequest, res: Response): Promise<void> => {
//   const blog = await Blog.findById(req.params.id);
//   if (!blog) return res.status(404).json({ message: "Blog not found" });
//   blog.likes += 1;
//   await blog.save();
//   res.status(200).json(blog);
// };
// export const likeBlog = async (
//   req: AuthRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       res.status(404).json({ message: "Blog not found" });
//       return;
//     }
//     if (!req.userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const userObjectId = new mongoose.Types.ObjectId(String(req.userId));
//     // Ensure likes is an array
//     if (!Array.isArray(blog.likes)) {
//       blog.likes = [];
//     }
//     // Check if user already liked the blog
//    const liked = blog.likes.some((id) => String(id) === String(userObjectId));
//     if (liked) {
//       blog.likes = blog.likes.filter(
//         (id) => String(id) !== String(userObjectId)
//       );
//       await blog.save();
//       res.status(200).json({ message: "Blog unliked", blog });
//     } else {
//       blog.likes.push(userObjectId);
//       await blog.save();
//       res.status(200).json({ message: "Blog liked", blog });
//     }
//   } catch (error) {
//     console.error("Error in likeBlog:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };
const commentOnBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        // Add comment logic
        if (req.userId) {
            const newComment = {
                user: new mongoose_1.default.Types.ObjectId(req.userId),
                content: req.body.comment,
                createdAt: new Date(),
            };
            blog.comments.push(newComment);
        }
        else {
            res.status(400).json({ message: "User ID is required to comment" });
            return;
        }
        yield blog.save();
        res.status(201).json({ message: "Comment added successfully", blog });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.commentOnBlog = commentOnBlog;
