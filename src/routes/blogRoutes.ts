import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  likeBlog,
  commentOnBlog,
} from "../contollers/BlogController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/:id/like", authMiddleware, likeBlog);
router.post("/:id/comment", commentOnBlog);

export default router;
