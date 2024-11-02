import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://th.bing.com/th?id=OIP.UvTX9P8q_1Dm_2_E_WsOSwHaIO&w=237&h=263&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    }
    
},{timestamps:true})

const User=mongoose.model('User',userSchema);

export default User;