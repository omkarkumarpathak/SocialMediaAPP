import express from 'express'

import authRoutes from './Router/auth.route.js'
import userRoutes from './Router/user.route.js'
import postRoute from './Router/post.route.js'
import commentRoute from './Router/comment.route.js'
import chatRoute from './Router/chat.route.js';
import db from './utils/db.js'

import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path'

import csrfProtection from './utils/verifyCsrfToken.js'
import limiter from './utils/rater-limiter.js'
import helmet from 'helmet'

const __dirname = path.resolve();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
dotenv.config();

//creating chat server
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST"], // Allow GET and POST requests
    }
});

let users = [];

io.on('connection', (socket) => {

    console.log('a user connected', socket.id);

    // Handle events here
    socket.on('addUser', (currentUserID) => {
        
        console.log(currentUserID);
        const isUserExist = users.find(user => user.userID === currentUserID);
        
        if (!isUserExist) {
            const user = { userID: currentUserID, socketID: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
        
    });

    socket.on('sendMessage', ({ senderId, conversationId, message, receiverId }) => {
        const receiver = users.find((user) => user.userID === receiverId);

        //if he online
        if (receiver) {
            io.to(receiver.socketID).to(socket.id).emit('getMessage', {
                senderId,
                conversationId,
                message,
                receiverId,
            });
        }
        else {
            io.to(socket.id).emit('getMessage', {
                senderId,
                conversationId,
                message,
                receiverId,
            });
        }
    })

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id);
        console.log('user disconnected');
        io.emit('getUsers', users);
    });
});
  
app.use(express.json());
app.use(cookieParser());

app.use(limiter);
app.use(helmet());

app.get('/api/csrf-token', csrfProtection, (req,res)=>{
    res.json({csrfToken:req.csrfToken()});
})


server.listen(4000 || process.env.PORT, () => {
    console.log('Server is listening')
})


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute); 

//chat box
app.use('/api/chat', chatRoute);

app.use(express.static(path.join(__dirname, '/Client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
})



