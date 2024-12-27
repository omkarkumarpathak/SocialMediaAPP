import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    PostId:{
        type:String,
        require:true,
    },
    userId:{
        type:String,
        require:true,
    },
    likes:{
        type:Array,
        default:[],
    },
    noOfLikes:{
        type:Number,
        default:0,
    },

},{timestamps:true})

const Comment=mongoose.model('Comment',commentSchema);

export default Comment;