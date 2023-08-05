import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import FirebaseStorage from "multer-firebase-storage";
import Multer from "multer";
import "dotenv/config";

function firebaseInit() {
  // let fireBaseStorage = null;
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const multer = Multer({
    storage: FirebaseStorage({
      bucketName: process.env.FIREBASE_STORAGE_URL,
      directoryPath: 'mapverse_images',
      credentials: {
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\n/gm, "\n") : undefined,
        projectId: process.env.FIREBASE_PROJECT_ID
      },
      public: true,
      unique: true
    })
  })

  // Initialize Firebase
  // const firebaseApp = initializeApp(firebaseConfig);


  // // Initialize Cloud Storage and get a reference to the service
  // fireBaseStorage = getStorage(firebaseApp);
  // return fireBaseStorage;
  return multer;
}

export default firebaseInit;