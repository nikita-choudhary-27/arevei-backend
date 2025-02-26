import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

interface IComment {
  _id?: string;
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
}

interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  likes: ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});



const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model<IBlog>("Blog", BlogSchema);


