import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import storage module
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBqCWxCqaxgr3Dh9FEr3UMokQPnvGjOKDA",
  authDomain: "blogwebsite-43997.firebaseapp.com",
  projectId: "blogwebsite-43997",
  storageBucket: "blogwebsite-43997.appspot.com",
  messagingSenderId: "265056076462",
  appId: "1:265056076462:web:f5b4ce1aced8fae725633f"
  });

  const fb = firebase;

  // Get a reference to the default storage service
  const storage = firebase.storage();
  
export { fb ,storage };
