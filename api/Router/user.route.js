import express from "express";
import {sendOTPtoMail, signOut, updatePassword } from "../controller/user.controller.js";
import {updateUser, deleteUser,getUser,allUsers} from '../controller/user.controller.js'
const router=express.Router();

router.get('/allUsers',allUsers)
router.post('/signOut',signOut);
router.post('/sendMail',sendOTPtoMail);
router.put('/update/:userId',updateUser);
router.put('/updatePassword/:email',updatePassword);
router.delete('/delete/:userId',deleteUser);

//for comment section
router.get('/:userId',getUser);

export default router;