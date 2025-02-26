import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  // likeBlog,
  commentOnBlog,
} from "../contollers/BlogController";

import auth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id",auth, getBlogById);
// router.post("/:id/like", auth, likeBlog);
router.post("/:id/comment", auth, commentOnBlog);


export default router;
