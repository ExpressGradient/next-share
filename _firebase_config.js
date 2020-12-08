import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCOwneodkGJtcoPdjMt5JBKVxUSFmtGULs",
    authDomain: "next-share-e6f59.firebaseapp.com",
    projectId: "next-share-e6f59",
    storageBucket: "next-share-e6f59.appspot.com",
    messagingSenderId: "825294184085",
    appId: "1:825294184085:web:cf8d50e58b43c66b49059c",
    measurementId: "G-6R3Z063N13"
};

try {
    firebase.initializeApp(firebaseConfig)
} catch (error) {
    console.error(error);
}

const storage = firebase.storage();
let storageRef = storage.ref();

export const uploadFile = (folder, data, callback) => {
    storageRef.child(folder).child(data.name).put(data).then(callback);
}

export const getFiles = (folder) => {
    return storageRef.child(folder).listAll();
}
