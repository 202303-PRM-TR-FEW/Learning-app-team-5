'use client'
import { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore"

// create the context
const AuthContext = createContext()

//  the Authentication Provider
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})


    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return setDoc(doc(db, 'users', email), {
                    savedCourses: [],
                    registeredCourses: []
                });
            })
            .catch((error) => {

                console.error('Error signing up:', error);
            });
    }

    function signIn() {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])


    return (
        // pass all the functions as props so we can use them in our app components
        <AuthContext.Provider value={{ signIn, logOut, signUp, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}