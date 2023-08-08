import Multer from "multer"  
import FirebaseStorage from "multer-firebase-storage";
import firebaseObj from "./firebase-init.js";
import "dotenv/config";

const multerObj = Multer({
    storage: FirebaseStorage({
      bucketName: process.env.FIREBASE_STORAGE_URL,
      directoryPath: 'mapverse_images',
      public: true,
      unique: true,
    }, firebaseObj)
})

export default multerObj