import "dotenv/config";
import fbAdmin from "firebase-admin";


  // let fireBaseStorage = null;
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object

  const firebaseObj = fbAdmin.initializeApp({
    credential: fbAdmin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID
    }),
    storageBucket: "mapverse-e16e8.appspot.com"
  })

  // const multer = Multer({
  //   storage: FirebaseStorage({
  //     bucketName: process.env.FIREBASE_STORAGE_URL,
  //     directoryPath: 'mapverse_images',
  //     public: true,
  //     unique: true,
  //   }, fbInstance)
  // })

  // Initialize Firebase
  // const firebaseApp = initializeApp(firebaseConfig);
  // // Initialize Cloud Storage and get a reference to the service
  // const fireBaseStorage = fbInstance.storage()
  // const fireBaseStorage = getStorage(fbInstance, process.env.FIREBASE_STORAGE_URL)
  // return fireBaseStorage;
  // console.log(getApp(fbInstance))


export default firebaseObj;