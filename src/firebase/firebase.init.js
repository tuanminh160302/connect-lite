// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc, setDoc, collection, getDocs, where, query, deleteField } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { getAuth, updateProfile, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBv6HSVtsNIW0TcWBqK6Vkhwce6QVboAfg",
    authDomain: "connect-lite-15364.firebaseapp.com",
    projectId: "connect-lite-15364",
    storageBucket: "connect-lite-15364.appspot.com",
    messagingSenderId: "773206892661",
    appId: "1:773206892661:web:f5ee9173f58a52591b583c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();
export const storage = getStorage()
const auth = getAuth()

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
}

export const createUserDocument = async (user) => {
    if (!user) return
    const {uid, displayName, email, photoURL} = user
    const userRef = doc(db, 'users', uid)
    const snap = await getDoc(userRef)
    if (!snap.exists()) {
        try {
            await setDoc(userRef, {
                createdAt: user.metadata.createdAt,
                displayName,
                email,
                photoURL,
                uid
            }).then(() => {
                //
            }) 
        } catch (err) {
            console.log(err.code, err.name)
        }
    } else {
        return
    }
}

// export const fetchUserDocument = async (uid) => {
//     if (!uid) return
//     const userRef = doc(db, 'users', uid)
//     const snap = await getDoc(userRef)
//     if (!snap.exists()) {
//         return
//     } else {
//         console.log(snap)
//     }
// }

export default firebaseApp;