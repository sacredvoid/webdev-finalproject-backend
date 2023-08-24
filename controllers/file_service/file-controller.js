import multerObj from "./multer-init.js";
import { getStorage } from "firebase-admin/storage"

const uploadSingle = multerObj.single('file');
const uploadMultiple = multerObj.array('file');
const folderName = 'mapverse_images/';
export default (app) => {
    app.post('/api/files/upload', uploadSingle, uploadFile);
    app.post('/api/files/delete', deleteFile)
    app.post('/api/files/multi-upload', uploadMultiple, uploadMultipleF);
}
const uploadFile = (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error:'File upload failed'});
        }
        else {
            console.log("$$$$$$$$$$$$$$$$$",req.file.publicUrl);
            return res.status(200).json({public_url: req.file.publicUrl});
        }
    } catch (error) {
        return res.status(500).message('File upload failed due to:',error.message);
    }
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

const uploadMultipleF = (req, res) => {
    try {
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({error:'File upload failed'});
        }
        else {
            let urls = req.files.map(file => {
                return file.publicUrl;
            });

            return res.status(200).json({public_url: urls});
        }
    } catch (error) {
        console.log("in file-controller.js",error.message);
        return res.status(500).json({"File upload": error.message});
    }
}