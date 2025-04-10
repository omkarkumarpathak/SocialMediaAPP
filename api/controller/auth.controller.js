import User from "../Model/user.model.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createToken } from "../utils/CreateToken.js";

export const test=(req,res)=>{
    res.json({message: "API Test is working"})
}

export const signUp=async(req,res)=>{
    
    try {
        const {username,email,password}=req.body; 

        if(!username || !email || !password || username==='' || password==='' || email==='' ){
            return res.status(505).json({message:"Enter All fields"});
        }

        const exitUser=await User.findOne({email});
        if(exitUser){
            return res.status(401).json({success:false,message:"User already exist"});
        }

        const hashedPassword=bcryptjs.hashSync(password,10);

        const newUser=new User({
            username:username,
            password:hashedPassword,
            email:email,
        })
      
        const response=await newUser.save();

        console.log('data saved');

        //if successfully saved, below will be called
        res.status(200).json({response:response});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
    }
}

export const signIn=async(req,res)=>{
    try {
        
        const {email,password}=req.body;
        
        const validUser=await User.findOne({email});
        if(!validUser){
            return res.status(401).json({success:false,message:"User Not found"});
        }

        const matchedPassword=bcryptjs.compareSync(password,validUser.password);

        if(!matchedPassword) return res.status(401).json({success:false,message:"Invalid email or Password"});

        //creating token
       
        const token= jwt.sign({id:validUser._id, isAdmin: validUser.admin},process.env.JWT_SECRET,{ expiresIn: '1h' });

        //sending token+state data to resist-persist for cookie
        //except password
        const { password: pass, ...rest } = validUser._doc;
        
        res.status(200).cookie('access_token', token, 
            { 
                httpOnly: true,
                secure:true,
                sameSite:"strict"
             })
            .json(rest);


    } catch (error) {
        res.status(500).json({message:"internal Server error"});
    }
}

export const google = async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id},
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        res.status(500).json("internal server error");
    }
}



