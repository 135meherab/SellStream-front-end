import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCVoRi6LYNzjE64_8uN_4jpcnEYWRZht6A",
    authDomain: "selstream.firebaseapp.com",
    projectId: "selstream",
    storageBucket: "selstream.appspot.com",
    messagingSenderId: "730224692666",
    appId: "1:730224692666:web:618c3ed961bce30296a183",
    measurementId: "G-T28DZ20JNR"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  export { auth, googleProvider };