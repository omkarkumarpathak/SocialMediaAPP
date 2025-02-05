import express from 'express';
import {CreatePost,getPosts,deletePost,updatePost, likePost} from '../controller/post.controller.js'
import { verifyToken } from '../utils/verifyToken.js';
const router=express.Router();

router.post('/create',verifyToken,CreatePost);
router.get('/getPosts',getPosts);
router.delete('/deletePost/:PostId/:PostCreatorId/:currentUserId',verifyToken,deletePost);
router.put('/updatePost/:PostId/:PostCreatorId/:currentUserId',verifyToken,updatePost);
router.put('/likedPost/:PostId',verifyToken,likePost);

export default router;