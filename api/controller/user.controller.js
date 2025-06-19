import User from "../Model/user.model.js";
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const updateUser = async (req, res) => {

    try {
        const userId = req.params.userId;

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    image: req.body.image,
                },
            },
            { new: true },
        );

        const { password, ...rest } = updatedUser._doc;   
        res.status(200).json(rest);

    } catch (error) {
        res.status(500).json({ message: "Internal error" });
    }
};

export const updatePassword = async (req, res) => {

    const email = req.params.email;
    const { password } = req.body;

    if (!password || password.length < 5)
        return res.status(200).json({ message: "Password to daal le" });
    try {

        if (password) {
            password = bcryptjs.hashSync(password, 10);
        }
        const response = await User.findOneAndUpdate({ email }, {
            $set: {
                password
            }
        }, { new: true });

        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user delete Successfully');
    } catch (error) {
        res.status(505).json("Internal server error");
    }

}

export const signOut = async (req, res) => {

    try {
        res.clearCookie('access_token').status(200).json("Signed Out successfully");
    } catch (error) {
        res.status(505).json({ message: "Internal server error" });
    }
}

export const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);

    } catch (error) {
        res.status(505).json({ message: "Internal server error" });
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// Sending 

// Gmail transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omkarpathak.delhi@gmail.com',
        pass: process.env.GMAIL
    }
});


export const sendOTPtoMail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP required' });
    }

    const validUser=await User.findOne({email});

    console.log(validUser);


    if(!validUser){
        return res.status(404).json({error:"Email is not registered"});
    }

    const mailOptions = {
        from: 'omkarpathak.delhi@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
};
