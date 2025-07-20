import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken=(req,res,next)=>{
    
    const token=req.cookies.access_token;

    if(!token){
        return res.status(403).json('Unauthoriseddd')
    }
    
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json('Unauthorised');
        }
        req.user=user;
        next();
    });

    console.log(req.user)
    
};