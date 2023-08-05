import { getDownloadURL, uploadBytesResumable, deleteObject, ref } from "firebase/storage";
import generateUniqueFileName from "./filename_hasher.js";
import firebaseInit from "./firebase_init.js";

const folderName = 'mapverse_images/';
// Initializes our firebase storage object which will be used for file operations
const fireBaseStorage = firebaseInit();
// console.log(fireBaseStorage);
const firebaseStorageRef = ref(fireBaseStorage)
// console.log(firebaseStorageRef)

export default (app) => {
    app.post('/api/files/upload', uploadFile);
    // app.post('/api/files/download', downloadFile);
    app.post('/api/files/delete', deleteFile);
}

const uploadFile = (req, res) => {
    console.log(req);
    const fileName = req.body.fileName;
    const fileContent = req.body.imgData;
    console.log(fileName, fileContent);
    const newFileName = generateUniqueFileName(fileName);
    const uploadFileRef = ref(fireBaseStorage,folderName+newFileName);
    const uploadTask = uploadBytesResumable(uploadFileRef, fileContent);

    uploadTask.on('state_changed', 
    (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        }
    }, 
    (error) => {
        // Handle unsuccessful uploads
        console.log('File upload failed: ', error)
    }, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        const response = {
            success: true,
            downloadUrl: downloadURL
          };
        res.json(response);
        });
    });

}

// const downloadFile = (req, res) => {
//     const fileURL = req.params.url;
//     const tempFileSplit = fileURL.split('/')
//     const fileName = tempFileSplit[tempFileSplit.length - 1];

//     getDownloadURL(ref(firebaseStorageRef, folderName+fileName))
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // This can be downloaded directly:
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       const blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
//     const img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     console.log("The file didn't download: ", error)
//   });

// }

const deleteFile = (req, res) => {
    const fileLink = req.body.url;
    const tempFileSplit = fileLink.split('/');
    const fileName = tempFileSplit[tempFileSplit.length - 1];
    const fileRef = ref(fireBaseStorage, folderName+fileName);
    deleteObject(fileRef).then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        res.json({"error":error, "url":fileLink});
      });
}