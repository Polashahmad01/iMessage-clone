import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpWknMuIGhYgIuiNLefdqb8-vQ7lHM5Kg",
    authDomain: "imessage-clone-ae0bd.firebaseapp.com",
    projectId: "imessage-clone-ae0bd",
    storageBucket: "imessage-clone-ae0bd.appspot.com",
    messagingSenderId: "608972836261",
    appId: "1:608972836261:web:f53e0d65a593a2e7cb6c4c",
    measurementId: "G-W8QX8D4LHC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;