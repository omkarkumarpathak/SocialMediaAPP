import express from 'express'
import {createComment, getComments, likedComment,deleteComment, updateComment} from '../controller/comment.controller.js'
import {verifyToken}  from '../utils/verifyToken.js';

const router=express.Router();

router.post('/create',verifyToken,createComment);
router.delete('/deleteComment/:commentId',verifyToken,deleteComment);
router.put('/updateComment/:commentId',verifyToken,updateComment);
router.get('/getComments/:PostId',getComments);
router.put('/likedComment/:commentId',verifyToken,likedComment);



export default router