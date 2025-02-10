import express from "express";
import { signup, login } from "../contollers/authController";
import { auth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
