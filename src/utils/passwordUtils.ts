import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: Types.ObjectId | string): string => {
  return jwt.sign({ userId: userId.toString() }, JWT_SECRET, {
    expiresIn: "24h",
  });
};
