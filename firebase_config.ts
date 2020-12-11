import firebase from "firebase/app";
import "firebase/storage";

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

const storage: firebase.storage.Storage = firebase.storage();
let storageRef: firebase.storage.Reference = storage.ref();

export const uploadFile = (folder: string, data: File, callback) => {
    storageRef.child(folder).child(data.name).put(data).then(callback);
}

export const getFiles = (folder: string) => {
    return storageRef.child(folder).listAll();
}

export const downloadFile = async (folder: string, file: string) => {
    const fileRef: firebase.storage.Reference = storageRef.child(folder).child(file);
    return await fileRef.getDownloadURL();
}

export const deleteFile = (folder: string, file: string, callback: () => void) => {
    storageRef.child(folder).child(file).delete().then(callback);
}