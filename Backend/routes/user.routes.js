import express from "express";
import { registerUser, verifyEmail,loginUser, Logout, updateProfile, getMyProfile, 
    getUserProfile,  } from "../controllers/user.controller.js";
import isAuth from "../middelwares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
router.get("/logout", Logout);
router.put('/profile', isAuth, updateProfile);
// Get logged-in user's profile (protected)
router.get('/my-profile', isAuth, getMyProfile);
// Get specific user's public profile
router.get('/profile/:userId', getUserProfile);
export default router;
