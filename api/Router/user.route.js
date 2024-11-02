import express from "express";
import {signOut } from "../controller/user.controller.js";
import {updateUser, deleteUser,getUser} from '../controller/user.controller.js'
const router=express.Router();

// router.get('/users',getUser)
router.post('/signOut',signOut);
router.put('/update/:userId',updateUser);
router.delete('/delete/:userId',deleteUser);

//for comment section
router.get('/:userId',getUser);

export default router;