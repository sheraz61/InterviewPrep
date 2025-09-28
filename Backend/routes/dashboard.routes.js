import express from "express";
import {getAllUsersProfiles} from '../controllers/dashboard.controller.js'
import isAuth from "../middelwares/auth.js";

const router = express.Router();
router.get('/users', getAllUsersProfiles);
export default router;
