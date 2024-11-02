import express from 'express'
import authRoutes from './Router/auth.route.js'
import userRoutes from './Router/user.route.js'
import postRoute from './Router/post.route.js'
import commentRoute from './Router/comment.route.js'

import mongoose from 'mongoose';
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser';

mongoose.connect("mongodb+srv://omkarpathakdelhi:LA7uXMHwxSUIOC6l@cluster0.ox1je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db=mongoose.connection;
//Even listeners
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
}
)
const app=express();
app.use(express.json())
app.use(cookieParser());

dotenv.config();

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);

app.listen(process.env.PORT,()=>{
    console.log('Server is listening')
})

