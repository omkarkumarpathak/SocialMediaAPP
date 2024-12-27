import express from 'express';
import {conversation,getConversations,createMessage,getMessages} from '../controller/chat.controller.js';

const router=express.Router();

//step-1: creating conversation
router.post('/conversation',conversation);

//step-2: creating message if convoId is there
//or creating new convoID & message for new conversation
router.post('/createMessage',createMessage);

//to access all conversation of currentUser 
router.get('/conversations/:userId',getConversations);


//accessing messages of conversationID
router.get('/messages/:conversationId',getMessages);

export default router;
