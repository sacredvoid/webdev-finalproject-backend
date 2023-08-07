import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseInit from "./firebase_init.js";


const folderName = 'mapverse_images/';
// Initializes our firebase storage object which will be used for file operations
const { multer, fbStorage } = firebaseInit();
export default (app) => {
    app.post('/api/files/upload', multer.single('file'), uploadFile);
    app.post('/api/files/multipleupload', multer.array())
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
    const fileRef = ref(fbStorage, folderName+fileName);
    console.log("\n\nFILE REF!:::", fileRef)
    deleteObject(fileRef).then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        res.json({"error":error, "url":fileLink});
      });
}