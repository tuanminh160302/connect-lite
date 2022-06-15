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
    const { uid, displayName, email, photoURL } = user
    const userRef = doc(db, 'users', uid)
    const snap = await getDoc(userRef)
    if (!snap.exists()) {
        try {
            await setDoc(userRef, {
                createdAt: user.metadata.createdAt,
                displayName,
                email,
                photoURL,
                uid,
                username: user.email.split('@')[0]
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

export const fetchUserData = async (uid) => {
    if (!uid) return
    const userRef = doc(db, 'users', uid)
    const snap = await getDoc(userRef)
    if (!snap.exists()) {
        return
    }
    return snap.data()
}

export const fetchUserDataByUsername = async (username) => {
    if (!username) return
    let res = null
    const userCollectionRef = collection(db, 'users')
    const queryUserToBeDisplayed = query(userCollectionRef, where("username", "==", username))
    await getDocs(queryUserToBeDisplayed).then((querySnapshot) => {
        if (querySnapshot.size == 1) {
            querySnapshot.forEach((snap) => {
                res = snap.data()
            })
        }
    })
    return res
}

export const uploadImage = async (user, file) => {
    if (!user) {
        return
    }

    if (!file) {
        return 
    }
    
    let returnURL
    // Set up file collection
    const fileCollection = 'skill'

    // Get user username
    const fileName = file.name

    // Set up
    const pathToFile = `${fileCollection}/${fileName}`
    const fileRef = ref(storage, pathToFile)

    // Upload the file
    await uploadBytes(fileRef, file).then(() => {
        console.log("Uploaded a blob or file!");
    }).catch(err => console.log(err))
    // Update the avatar url in the database
    await getDownloadURL(ref(storage, pathToFile))
        .then((url) => {
            returnURL = url
        })
        .catch((err) => {
            console.log(err)
        })
    return returnURL
}

export default firebaseApp;