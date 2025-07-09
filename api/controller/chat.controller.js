import ChatMessage from "../Model/ChatModels/chatMessage.model.js";
import Conversation from "../Model/ChatModels/conversation.model.js";
import User from "../Model/user.model.js";


export const conversation=async(req,res)=>{
    try {

        const {senderId, receiverId}=req.body;

        if(!senderId || !receiverId) return res.status(404).json({message:"Enter all fields"});

        const isExist=await Conversation.find({members:[senderId,receiverId]});

        if(isExist) return res.status(401).json({message:"Conversation Already exists"});
       
        const newConversation =new Conversation(
           {members:[receiverId,senderId]}
        )

        await newConversation.save();
        res.status(200).json({message:"Conversation started successfully"});

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

export const getConversations=async(req,res)=>{

    try {

        const userId=req.params.userId;
        const conversations=await Conversation.find({members:{$in:[userId]}});
         
        const conversationUser=Promise.all(conversations.map(async (conversation)=>{
            const receiverId=conversation.members.find((id)=>id!==userId);
            if(receiverId){
                const user= await User.findById(receiverId);
                return {user:{id:user._id, email:user.email, username:user.username, image:user.image}, conversationId:conversation._id};
            }
            else return null;
        })) 
        
        const users= await conversationUser;
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const createMessage=async(req,res)=>{

    try {
        const {conversationId, senderId, message, receiverId}=req.body;
        
        if(!conversationId && !receiverId){
            return res.status(400).json({message:"Fill all fields"});
        }

        if(conversationId==='new' && receiverId){

            const newConversation=new Conversation({members:[senderId, receiverId]});
            await newConversation.save();

            const newMessage=new ChatMessage({
                conversationId:newConversation._id,
                senderId:senderId,
                message:message,
            })

            await newMessage.save();
            return res.status(200).json({newMessage});

        }

        const newMessage=new ChatMessage({
            conversationId:conversationId,
            senderId:senderId,
            message:message
        })

        await newMessage.save();
        res.status(200).json(newMessage);

    } catch (error) {
        res.status(500).json({error});
    }
}

export const getMessages=async(req,res)=>{
    try {
        const conversationId=req.params.conversationId;
        if(conversationId==='new') return res.status(200).json([]);

        const messages=await ChatMessage.find({conversationId});

        const messageUserData=Promise.all(messages.map(async(message)=>{
            const user=await User.findById(message.senderId);
            return {user:{id:user._id, username:user.username}, message: message.message};
        }))
        const messageData=await messageUserData
        res.status(200).json(messageData);

    } catch (error) {
        res.status(500).json({message:"ISError"});
    }
}