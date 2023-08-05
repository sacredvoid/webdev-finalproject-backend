import express from 'express';
import fileController from './controllers/file_service/file-controller.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
fileController(app);
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(4000);