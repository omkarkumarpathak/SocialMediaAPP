import express from 'express'

import authRoutes from './Router/auth.route.js'
import userRoutes from './Router/user.route.js'
import postRoute from './Router/post.route.js'
import commentRoute from './Router/comment.route.js'
import chatRoute from './Router/chat.route.js';

import mongoose from 'mongoose';
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser';

import path from 'path'

const __dirname = path.resolve();

const app = express();
dotenv.config();

//creating chat server
import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://mern-full-owmk.onrender.com/chat/inbox", // Allow requests from this origin
        methods: ["GET", "POST"], // Allow GET and POST requests
    }
});

let users = [];
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // Handle events here
    socket.on('addUser', currentUserID => {
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



mongoose.connect("mongodb+srv://omkarpathakdelhi:LA7uXMHwxSUIOC6l@cluster0.ox1je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
});

const db = mongoose.connection;
//Even listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
}
)


app.use(express.json());
app.use(cookieParser());


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



