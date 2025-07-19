import express from "express";
import csrfProtection from "../utils/verifyCsrfToken.js";
import { signUp,signIn,google } from "../controller/auth.controller.js";
const router=express.Router();

router.post('/signup',signUp);
router.post('/signIn',csrfProtection,signIn);
router.post('/google',csrfProtection,google);


export default router;