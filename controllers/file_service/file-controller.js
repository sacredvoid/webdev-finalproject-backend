import { deleteObject, ref } from "firebase/storage";
import firebaseInit from "./firebase_init.js";


const folderName = 'mapverse_images/';
// Initializes our firebase storage object which will be used for file operations
const multer = firebaseInit();

export default (app) => {
    app.post('/api/files/upload', multer.single('file'),uploadFile);
    app.post('/api/files/multipleupload', multer.array())
    app.post('/api/files/delete', deleteFile);
}

const uploadFile = (req, res) => {
    res.status(201).json(req.file);
}

const deleteFile = (req, res) => {
    const fileLink = req.body.url;
    const tempFileSplit = fileLink.split('/');
    const fileName = tempFileSplit[tempFileSplit.length - 1];
    const fileRef = ref(fireBaseStorage, folderName+fileName);
    deleteObject(fileRef).then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        res.json({"error":error, "url":fileLink});
      });
}