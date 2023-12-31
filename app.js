import express from 'express';
import fileController from './controllers/file_service/file-controller.js';
import cors from 'cors';
import connectDB from './mongo_db/conn.js';
import mongoose from 'mongoose';
import session from 'express-session'
import userController from './controllers/user/user-controller.js';
import eventsController from './controllers/events/events-controller.js'
import authController from './controllers/auth/auth-controller.js';
import "dotenv/config";


const PORT = 4000
connectDB()
const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    };
}
app.use(session(sessionOptions))
fileController(app);
app.get('/api', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.use('/api', userController);
app.use('/api', eventsController);
app.use('/api/users', authController)
mongoose.connection.once('open', () => {
    console.log("Connected To Database");
    app.listen(PORT, () => console.log('running on port',PORT))
})
