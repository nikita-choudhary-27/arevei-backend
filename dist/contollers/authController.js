"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const passwordUtils_1 = require("../utils/passwordUtils");
const lodash_1 = require("lodash");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email already registered" });
            return;
        }
        // Hash password and create user
        const hashedPassword = yield (0, passwordUtils_1.hashPassword)(password);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            name,
        });
        yield user.save();
        const token = (0, passwordUtils_1.generateToken)(user._id);
        // Remove password from response
        const userResponse = (0, lodash_1.omit)(user.toObject(), ["password"]);
        res.status(201).json({ user: userResponse, token });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield User_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Verify password
        const isMatch = yield (0, passwordUtils_1.comparePasswords)(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = (0, passwordUtils_1.generateToken)(user._id);
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        res.json({ user: userResponse, token });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.logout = logout;
