import express from 'express';
import fileController from './controllers/file_service/file-controller.js';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './mongo_db/conn.js';
import mongoose from 'mongoose';
import userController from './controllers/user/user-controller.js';


const PORT = 4000
connectDB()
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fileController(app);
app.get('/api', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.use('/api', await userController)
mongoose.connection.once('open', () => {
    console.log("Connected To Database");
    app.listen(PORT, () => console.log('running on port',PORT))
})