import jwt from "jsonwebtoken";

export const createToken=({userId,res})=>{
    
    return jwt.sign({userId},process.env.JWT_SECRET);

}