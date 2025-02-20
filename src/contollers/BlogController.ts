import { Request, Response } from "express";
import Blog from "../models/Blog";
import mongoose from "mongoose";
import User from "../models/User";


export const createBlog = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });
  await newBlog.save();
  res.status(201).json(newBlog);
};

export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};

export const getBlogById = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.status(200).json(blog);
};

export const likeBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  blog.likes += 1;
  await blog.save();
  res.status(200).json(blog);
};

export const commentOnBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  const { userId, content } = req.body;
  const user = await User.findById(userId); // Assuming you have a User model
  if (!user) return res.status(404).json({ message: "User not found" });
  const comment = new Blog.Comment({
    user: user._id,
    content,
    createdAt: new Date(),
    _id: new mongoose.Types.ObjectId()
  });
  blog.comments.push(comment);
  await blog.save();
  res.status(200).json(blog);
};
