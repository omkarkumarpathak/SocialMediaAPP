import express from "express";
import { signUp,signIn,google } from "../controller/auth.controller.js";
const router=express.Router();

router.post('/signup',signUp);
router.post('/signIn',signIn);
router.post('/google',google);


export default router;