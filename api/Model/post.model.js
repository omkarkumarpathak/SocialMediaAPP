import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true,
    },
    userId:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/04/15/05/48/woman-7927039_1280.png"
    },
},{timestamps:true})

const Post=mongoose.model('Post',postSchema);

export default Post;