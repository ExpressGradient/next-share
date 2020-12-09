import firebase from "firebase/app";
import "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCOwneodkGJtcoPdjMt5JBKVxUSFmtGULs",
//     authDomain: "next-share-e6f59.firebaseapp.com",
//     projectId: "next-share-e6f59",
//     storageBucket: "next-share-e6f59.appspot.com",
//     messagingSenderId: "825294184085",
//     appId: "1:825294184085:web:cf8d50e58b43c66b49059c",
//     measurementId: "G-6R3Z063N13"
// };

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    firebase.app();
}

const storage = firebase.storage();
let storageRef = storage.ref();

export const uploadFile = (folder, data, callback) => {
    storageRef.child(folder).child(data.name).put(data).then(callback);
}

export const getFiles = (folder) => {
    return storageRef.child(folder).listAll();
}

export default function GoBack() {
    return <h1>PLEASE GO BACK</h1>
}
