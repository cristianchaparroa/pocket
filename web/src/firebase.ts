// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmepsedrOcttTySDxIE7tfI_k2XBpLOF4",
  authDomain: "my-pocket-project.firebaseapp.com",
  projectId: "my-pocket-project",
  storageBucket: "my-pocket-project.appspot.com",
  messagingSenderId: "1057959591362",
  appId: "1:1057959591362:web:0cd3d252fa06dfd8e56a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

