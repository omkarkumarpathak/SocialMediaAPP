import mongoose from "mongoose";

const chatMessageSchema=new mongoose.Schema({
    conversationId:{
        type:String,
    },
    senderId:{
        type:String,
    },
    message:{
        type:String,
    }
},{timestamps:true})

const ChatMessage=mongoose.model('ChatMessage',chatMessageSchema);

export default ChatMessage;
