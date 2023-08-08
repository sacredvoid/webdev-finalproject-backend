import "dotenv/config";
import fbAdmin from "firebase-admin";

const firebaseObj = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID
  }),
  storageBucket: process.env.FIREBASE_BUCKET_NAME
})

export default firebaseObj;