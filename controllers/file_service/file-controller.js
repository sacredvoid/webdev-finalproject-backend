import multerObj from "./multer-init.js";
import { getStorage } from "firebase-admin/storage"


const folderName = 'mapverse_images/';
export default (app) => {
    app.post('/api/files/upload', multerObj.single('file'), uploadFile);
    app.post('/api/files/multipleupload', multerObj.array())
    app.post('/api/files/delete', deleteFile);
}

const uploadFile = (req, res) => {
    res.status(201).json(req.file.publicUrl);
}

function extractFileName(link) {
  let tempSplit = link.split("%2F");
  let fileName = tempSplit[1];
  return fileName;
}

const deleteFile = (req, res) => {
    const fileLink = req.body.public_url;
    const fileName = extractFileName(fileLink);
    const fbStorage = getStorage();
    const fileRef = fbStorage.bucket().file(folderName+fileName);
    fileRef
       .delete()
       .then(() => {
        res.sendStatus(200);
       })
        .catch(err => {
           console.error(`Failed to delete file`, err);
           res.sendStatus(404);
        });
}