import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDog3TDYSiRBiRQTAGWCb1mVToz5CnCPmc",
    authDomain: "fairbase-chat-app.firebaseapp.com",
    projectId: "fairbase-chat-app",
    storageBucket: "fairbase-chat-app.appspot.com",
    messagingSenderId: "667752371478",
    appId: "1:667752371478:web:958dad53d42f1adda86c37"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth, db, storage};

  