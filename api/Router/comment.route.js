import express from 'express'
import {createComment, getComments, likedComment} from '../controller/comment.controller.js'
import {verifyToken}  from '../utils/verifyToken.js';

const router=express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getComments/:PostId',getComments);
router.put('/likedComment/:commentId',verifyToken,likedComment);



export default router