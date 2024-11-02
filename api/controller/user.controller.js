import User from "../Model/user.model.js";
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res) => {
    try {

        const userId = req.params.userId;

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password:req.body.password,
                    image:req.body.image,
                },
            },
            { new: true },
        );

        const { password, ...rest } = updatedUser._doc;  //for cookie except password
        res.status(200).json(rest);

    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
};

export const deleteUser=async(req,res)=>{

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user delete Successfully');
    } catch (error) {
        res.status(505).json("Internal server error");
    }

}

export const signOut=async(req,res)=>{
    try {
        res.clearCookie('access_token').status(200).json("Signed Out successfully");
    } catch (error) {
        res.status(505).json({message:"Internal server error"});
    }
}

export const getUser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId);
        
        const {password,...rest}=user._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(505).json({"message":"Internal server error"});
    }
}
