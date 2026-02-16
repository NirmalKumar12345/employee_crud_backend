import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';


export const SignUp = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Password and Confirm Password do not match" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashPassword });
        res.status(201).json({ msg: "Signup sucessfully", user });
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (!user.password) return res.status(400).json({ msg: "Invalid Password or Password not set" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRATION_TIME
    });
    res.status(200).json({ msg: "Login successfully", token });
}
export const setPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (user.password) {
            return res.status(400).json({ msg: "Password already exists" });
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();
        res.status(200).json({ msg: "Password set successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}
export const GoogleAuth = async (req, res) => {
    try {
        const { idToken } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const { email, sub } = ticket.getPayload();
        let user = await User.findOne({ email });
        let isNewUser = false;
        if (!user) {
            user = await User.create({ email, googleId: sub });
            isNewUser = true;
        } else if (!user.googleId) {
            user.googleId = sub;
            await user.save();
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRATION_TIME
        });
        res.status(200).json({ msg: isNewUser ? "Signup successfully" : "Login successfully", token, isNewUser, hasPassword: !!user.password });
    }
    catch (error) {
        res.status(500).json({ msg: "Google Authentication failed" });
    }

}
