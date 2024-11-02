// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAukrjyojQNtvWsyO1qJ21yh-DMpK46sDU",
  authDomain: "mern-practice-9e71e.firebaseapp.com",
  projectId: "mern-practice-9e71e",
  storageBucket: "mern-practice-9e71e.appspot.com",
  messagingSenderId: "706625764618",
  appId: "1:706625764618:web:27a914597134c5c5990ef3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
