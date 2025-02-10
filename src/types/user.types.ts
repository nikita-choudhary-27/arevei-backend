import { Document, Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
