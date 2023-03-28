import firebase from "firebase/app";
import "firebase/database";

const config = {
    apiKey: "AIzaSyB3a-K3r6rLHTW__jhGYMkeLqUD2011Lc8",
    authDomain: "silmun-35873.firebaseapp.com",
    databaseURL: "https://silmun-35873-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "silmun-35873",
    storageBucket: "silmun-35873.appspot.com",
    messagingSenderId: "73965917449",
    appId: "1:73965917449:web:4cf3ff8a2902742d132fd8",
};

firebase.initializeApp(config);

export default firebase.database();