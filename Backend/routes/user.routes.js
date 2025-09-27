import express from "express";
import { registerUser, verifyEmail,loginUser, Logout, updateProfile } from "../controllers/user.controller.js";
import isAuth from "../middelwares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
router.get("/logout", Logout);
router.put("/update", isAuth,updateProfile);

export default router;
