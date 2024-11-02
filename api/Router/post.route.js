import express from 'express';
import {CreatePost,getPosts,deletePost,updatePost} from '../controller/post.controller.js'
import { verifyToken } from '../utils/verifyToken.js';
const router=express.Router();

router.post('/create',verifyToken,CreatePost);
router.get('/getPosts',getPosts);
router.delete('/deletePost/:PostId/:PostCreatorId/:currentUserId',verifyToken,deletePost);
router.put('/updatePost/:PostId/:PostCreatorId/:currentUserId',verifyToken,updatePost);

export default router;