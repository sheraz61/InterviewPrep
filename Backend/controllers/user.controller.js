import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// REGISTER with email verification
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // generate 4-digit verification code
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpires: Date.now() + 10 * 60 * 1000, // 10 min
        });

        // send email
        await sendEmail(
            email,
            "Mockly - Verify your Email",
            `Your verification code is: ${verificationCode}`
        );

        res.status(201).json({
            message: "Verification code sent to email",
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// VERIFY email
export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.isVerified) return res.status(400).json({ message: "Already verified" });

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid code" });
        }

        if (user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({ message: "Code expired" });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// LOGIN user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        // check user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Email" });

        // check if verified
        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before login" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        // generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        res.status(200).cookie('token', token, { expiresIn: "1d", httpOnly: true }).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", "", { expiresIn: new Date(Date.now()) });
        return res.status(200).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

