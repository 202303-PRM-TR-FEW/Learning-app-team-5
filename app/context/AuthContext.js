'use client'
import { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { setDoc, doc, onSnapshot } from "firebase/firestore"
import { useRouter } from "next/navigation";

// create the context
const AuthContext = createContext()

//  the Authentication Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [Error, setError] = useState(null);
  const router = useRouter()


  function signUp(email, password, displayName, city) {
    console.log(displayName)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        //  set Firestore document
        return setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          password: password,
          city: city,
          username: displayName,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/learning-app-team-5.appspot.com/o/review-placeholder-1.png?alt=media&token=e928937b-03be-49ab-8e26-170e44d9aa8a"
        });

      })
      .catch((error) => {
        console.log(error)

      });
  }

  function signIn(email, password) {
    // Check if the email address exists in Firebase Authentication
    fetchSignInMethodsForEmail(auth, email, password)
      .then((signInMethods) => {
        // If the email exists in Firebase Authentication, try to sign in with the provided email and password
        if (signInMethods.length > 0) {
          signInWithEmailAndPassword(auth, email, password)
          router.push("/profile")
        } else {
          throw new Error('Email not found. Please sign up first.');
        }
      })

      .catch(() => {
        setError("Email not found. Please sign up first");
        setTimeout(() => { setError(null) }, 4000)
      });
  }

  function logOut() {
    signOut(auth)

      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);

        const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          } else {
            console.log("No such user!");
          }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    // pass all the functions as props so we can use them in our app components
    <AuthContext.Provider value={{ signIn, logOut, signUp, user, Error, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext)
}