import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String }, // 4-digit code
  verificationCodeExpires: { type: Date },
    // New dashboard fields
    profile: {
        techStack: {
            type: String,
        },
        experience: {
            type: String,
            default: 'Fresher'
        },
        currentRole: String,
        location: String,
        bio: String,
        skills:String,
        linkedin: String,
        github: String
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
