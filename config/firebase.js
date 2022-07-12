import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRyK6QXIYCLqzv1LZRWFTmPeGt0fUfCjI",
  authDomain: "school-project-8ab38.firebaseapp.com",
  projectId: "school-project-8ab38",
  storageBucket: "school-project-8ab38.appspot.com",
  messagingSenderId: "570732798409",
  appId: "1:570732798409:web:7f16ae11db204abe74c818",
  measurementId: "G-7W9S0P4H37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init service
export const db = getFirestore(app);

// Collection Reference
export const colRef = collection(db, "users");

// Functions
// export const helloWorld = functions()
// get collection data

getDocs(colRef)
  .then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

export const auth = getAuth();
export const functions = getFunctions(app);
