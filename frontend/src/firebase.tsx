import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCt-UqcomkZrQAiqMFT0tDEN504v4GibGQ",
    authDomain: "assemblemessaging.firebaseapp.com",
    projectId: "assemblemessaging",
    storageBucket: "assemblemessaging.firebasestorage.app",
    messagingSenderId: "275198981880",
    appId: "1:275198981880:web:ff7a21df4202c40455ed0d"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }