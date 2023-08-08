import multerObj from "./multer-init.js";
import firebaseObj from "./firebase-init.js";
import { getStorage } from "firebase-admin/storage"


const folderName = 'mapverse_images/';
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
    const fileLink = req.body.public_url;
    const fileName = extractFileName(fileLink);
    // const fileRef = ref(getStorage(), folderName+fileName)
    const fbStorage = getStorage();
    // // const fileRef = fbStorage.bucket().file(folderName+fileName)
    // const fileRef = fbStorage.bucket().delete()
    const fileRef = fbStorage.bucket().file(folderName+fileName);
    fileRef
       .delete()
       .then(() => {
        res.sendStatus(200);
       })
        .catch(err => {
           console.error(`Failed to delete file`, err);
           res.json(404);
        });
    // deleteObject(fileRef).then(() => {
    //     res.sendStatus(200);
    //   }).catch((error) => {
    //     res.json({"error":error, "url":fileLink});
    //   });

}