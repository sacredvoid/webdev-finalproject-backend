import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

function firebaseInit() {
  let fireBaseStorage = null;
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  console.log(process.env.FIREBASE_STORAGE_URL) // CHECK THIS
  const firebaseConfig = {
    storageBucket: 'gs://mapverse-e16e8.appspot.com'
    // storageBucket: process.env.FIREBASE_STORAGE_URL
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);


  // Initialize Cloud Storage and get a reference to the service
  fireBaseStorage = getStorage(firebaseApp);
  return fireBaseStorage;
}

export default firebaseInit;