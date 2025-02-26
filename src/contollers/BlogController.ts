import { Request, Response } from "express";
import Blog from "../models/Blog";
import { AuthRequest } from "../middleware/authMiddleware"; 
import mongoose from "mongoose";
import User from "../models/User";


export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });
  await newBlog.save();
  res.status(201).json(newBlog);
};

export const getAllBlogs = async (req: AuthRequest, res: Response) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};




export const getBlogById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


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





export const commentOnBlog = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Add comment logic
    if (req.userId) {
      const newComment = {
        user: new mongoose.Types.ObjectId(req.userId), 
        content: req.body.comment,
        createdAt: new Date(),
      };

      blog.comments.push(newComment);
    } else {
      res.status(400).json({ message: "User ID is required to comment" });
      return;
    }
    await blog.save();

    res.status(201).json({ message: "Comment added successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


