import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import Interview from "../models/Interview.model.js";
import mongoose from "mongoose";
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
  `
  <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; text-align: center; border: 1px solid #000000; border-radius: 8px; max-width: 500px; margin: auto;">
    <h2 style="color: #000000; margin-bottom: 10px;">Mockly</h2>
    <p style="color: #333333; font-size: 16px; margin-bottom: 20px;">
      Please verify your email to complete registration.
    </p>
    <div style="background-color: #000000; color: #ffffff; padding: 15px; font-size: 22px; font-weight: bold; border-radius: 6px; display: inline-block; letter-spacing: 4px;">
      ${verificationCode}
    </div>
    <p style="color: #555555; font-size: 14px; margin-top: 20px;">
      Enter this code in the app to activate your account.<br>
      If you didn’t request this, you can safely ignore this email.
    </p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
    <p style="color: #888888; font-size: 12px;">
      &copy; ${new Date().getFullYear()} Mockly. All rights reserved.
    </p>
  </div>
  `
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
        const {email, code } = req.body;
if(!email||!code){
    return res.status(400).json({ message: "Both Feild require" })
}
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
 // Generate token for automatic login after verification
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );
        res.status(200).json({ 
            message: "Email verified successfully", 
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token // Make sure this is included
        });
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
            token: token // Add token to response for frontend localStorage
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

// controllers/userController.js
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        const { techStack, experience, currentRole, location, bio, skills, linkedin, github } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update profile fields
        user.profile = {
            techStack: techStack || user.profile?.techStack,
            experience: experience || user.profile?.experience || 'Fresher',
            currentRole: currentRole || user.profile?.currentRole,
            location: location || user.profile?.location,
            bio: bio || user.profile?.bio,
            skills: skills || user.profile?.skills,
            linkedin: linkedin || user.profile?.linkedin,
            github: github || user.profile?.github
        };

        // Validate LinkedIn URL format if provided
        if (linkedin && !linkedin.startsWith('https://linkedin.com/') && !linkedin.startsWith('https://www.linkedin.com/')) {
            return res.status(400).json({
                message: "Please provide a valid LinkedIn URL",
                success: false
            });
        }

        // Validate GitHub URL format if provided
        if (github && !github.startsWith('https://github.com/')) {
            return res.status(400).json({
                message: "Please provide a valid GitHub URL",
                success: false
            });
        }

        await user.save();

        // Return updated user without sensitive data
        const updatedUser = await User.findById(userId).select('-password -verificationCode -verificationCodeExpires');

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
        
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            message: "Failed to update profile: " + error.message,
            success: false
        });
    }
};


// controllers/userController.js
export const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        
        // Get user with profile data
        const user = await User.findById(userId).select('-password -verificationCode -verificationCodeExpires');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Get user's interview history
        const interviews = await Interview.find({ 
            userId: userId 
        }).sort({ createdAt: -1 }).select('technology difficulty status overallScore feedback createdAt');

        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isVerified: user.isVerified,
                    profile: user.profile,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                interviews: interviews
            }
        });
        
    } catch (error) {
        console.error('Get my profile error:', error);
        res.status(500).json({
            message: "Failed to load profile: " + error.message,
            success: false
        });
    }
};

// controllers/userController.js
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false
            });
        }

        // Get user with profile data (exclude sensitive information)
        const user = await User.findById(userId).select('-password -verificationCode -verificationCodeExpires -email');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Get user's completed interviews (only show completed ones for public profile)
        const interviews = await Interview.find({ 
            userId: userId,
            status: 'completed',
            overallScore: { $exists: true }
        }).sort({ createdAt: -1 }).select('technology difficulty overallScore feedback createdAt');

        // Calculate statistics
        const totalInterviews = interviews.length;
        const averageScore = totalInterviews > 0 ? 
            Math.round((interviews.reduce((sum, interview) => sum + interview.overallScore, 0) / totalInterviews) * 10) / 10 : 0;

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    profile: user.profile,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                interviews: interviews,
                statistics: {
                    totalInterviews: totalInterviews,
                    averageScore: averageScore,
                    completionRate: totalInterviews > 0 ? Math.round((interviews.length / totalInterviews) * 100) : 0
                }
            }
        });
        
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            message: "Failed to load user profile: " + error.message,
            success: false
        });
    }
};