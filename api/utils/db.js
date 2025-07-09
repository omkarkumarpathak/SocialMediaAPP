import mongoose from "mongoose";

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
})

export default db;
