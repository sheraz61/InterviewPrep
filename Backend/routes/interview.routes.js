import express from "express";
import {
    startInterview, 
  submitAnswer, 
  getResults,
  getInterviewHistory,
 } from "../controllers/interview.controller.js";
import isAuth from "../middelwares/auth.js";

const router = express.Router();
router.post('/start',isAuth, startInterview);
router.post('/submit/:id',isAuth, submitAnswer);
router.get('/results/:interviewId',isAuth, getResults);
router.get('/history',isAuth, getInterviewHistory);
export default router;
