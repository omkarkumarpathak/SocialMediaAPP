import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
    members:{
        type:Array,
        require:true,
        unique:true,
    }
},{timestamps:true})

const Conversation=mongoose.model('Conversation',conversationSchema);

export default Conversation;