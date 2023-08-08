import { deleteObject, getStorage, ref } from "firebase/storage";
// import firebaseInit from "./firebase_init.js";
// import {multer} from "./firebase_init.js"
import multerObj from "./init-multer.js";
import { getApp } from "@firebase/app";
import firebaseObj from "./firebase_init.js";


const folderName = 'mapverse_images/';
// Initializes our firebase storage object which will be used for file operations
// const { multer, fbStorage } = firebaseInit();
// const fbStorage = getStorage(firebaseObj)
const fbStorage = firebaseObj.storage()
// console.log(firebaseObj.storage())
export default (app) => {
    app.post('/api/files/upload', multerObj.single('file'), uploadFile);
    app.post('/api/files/multipleupload', multerObj.array())
    app.post('/api/files/delete', deleteFile);
}

const uploadFile = (req, res) => {
    // console.log(req.file);
    res.status(201).json(req.file);

}

function extractFileName(link) {
  let tempSplit = link.split("%2F");
  let fileName = tempSplit[1].split("?")[0];
  return fileName;
}

const deleteFile = (req, res) => {
    const fileLink = req.body.media_url;
    const fileName = extractFileName(fileLink);
    const fileRef = ref(fbStorage, folderName+fileName)
    console.log("\n\nFILE REF!:::", fileRef)
    deleteObject(fileRef).then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        res.json({"error":error, "url":fileLink});
      });
}