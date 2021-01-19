import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCGmf-XIxi-d4UPS441QokzePOXZypT37w",
  authDomain: "student-enrollment-102938.firebaseapp.com",
  databaseURL: "https://student-enrollment-102938.firebaseio.com",
  projectId: "student-enrollment-102938",
  storageBucket: "student-enrollment-102938.appspot.com",
  messagingSenderId: "844409039914",
  appId: "1:844409039914:web:21faab5df9818fd5b72753",
  measurementId: "G-SFXTM9YQDJ",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export default fb;
// firebase.auth().useDeviceLanguage();

export const auth = firebase.auth();
auth.useDeviceLanguage();
// firebase.analytics();
export const db = fb.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

