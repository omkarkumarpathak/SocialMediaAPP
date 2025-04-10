import jwt from "jsonwebtoken";

export const createToken=({userId,res})=>{
    
    return jwt.sign({id:userId},process.env.JWT_SECRET,{ expiresIn: '1h' });

}