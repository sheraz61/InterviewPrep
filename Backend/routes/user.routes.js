import express from "express";
import { registerUser, verifyEmail,loginUser, Logout } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
router.get("/logout", Logout);

export default router;
