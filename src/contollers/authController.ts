import { Request, Response } from "express";
import User from "../models/user";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "../utils/passwordUtils";
import { IUserDocument } from "../types/user.types";
 import { omit } from "lodash";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    const token = generateToken(user._id as string);

    // Remove password from response
  const userResponse = omit(user.toObject(), ["password"]);

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user: IUserDocument | null = await User.findOne({ email }).select(
      "+password"
    );
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Verify password
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
