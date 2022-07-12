const {
  collection,
  doc,
  getDocs,
  setDoc,
  getFirestore,
} = require("firebase/firestore");
const { initializeApp } = require("firebase/app");

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
const db = getFirestore(app);

(async () => {
  const snap = await getDocs(collection(db, "transaction"));
  snap.forEach((document) => {
    const ref = doc(db, "transaction", document.id);
    setDoc(ref, { timestamp: new Date().getTime() }, { merge: true });
    console.log(document.id);
  });
})();
