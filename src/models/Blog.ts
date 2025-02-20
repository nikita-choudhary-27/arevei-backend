import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  user: string;
  content: string;
  createdAt: Date;
}

interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
