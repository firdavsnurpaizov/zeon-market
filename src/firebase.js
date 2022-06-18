// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "./redux/main-reducer";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0zSzjemiRSpKZ9lPGRkNgJXrKrE2nqww",
    authDomain: "zeon-app.firebaseapp.com",
    projectId: "zeon-app",
    storageBucket: "zeon-app.appspot.com",
    messagingSenderId: "766493906924",
    appId: "1:766493906924:web:d123507f09aa9243ed12c9",
    measurementId: "G-N15KSDY5D4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export function useAuth() {
    const [currentUser, setCurrentUser] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                // console.log(user);
                setCurrentUser(user)
                dispatch(getUserThunk(user.uid));
            } else {
                console.log("no user");
                dispatch(getUserThunk());
            }
        })
        return unsub
    }, [])

    return currentUser
}


