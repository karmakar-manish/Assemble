import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBZl3MrzPvRYZeR7qGNb2j2u4k7Sc0-08Y",
    authDomain: "unlinkedin-fa987.firebaseapp.com",
    projectId: "unlinkedin-fa987",
    storageBucket: "unlinkedin-fa987.firebasestorage.app",
    messagingSenderId: "223104360239",
    appId: "1:223104360239:web:0a31fd28a23e2e1c230bda"

};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }