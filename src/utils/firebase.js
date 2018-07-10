import firebase from "firebase";
import 'firebase/auth/dist/index.cjs';
import 'firebase/firestore/dist/index.cjs';

var config = {
    apiKey: "AIzaSyBlKExhDlFYr9hM2CCv30FSMG9Wz0gLz3I",
    authDomain: "bottle-green-86d30.firebaseapp.com",
    databaseURL: "https://bottle-green-86d30.firebaseio.com",
    projectId: "bottle-green-86d30",
    storageBucket: "",
    messagingSenderId: "1032627040748"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

firestore.settings({
    timestampsInSnapshots: true
})

export {firebase, firestore};