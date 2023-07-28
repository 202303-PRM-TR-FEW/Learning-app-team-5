'use client'
import { useState, useContext, createContext, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail
} from 'firebase/auth'
import { setDoc, doc } from "firebase/firestore"

// create the context
const AuthContext = createContext()

//  the Authentication Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User data:', userCredential.user);
        return setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          /* password: user.password, */
          /* username: user.username, */
          savedCourses: [],
          registeredCourses: []
        });
      })
      .then(() => {
        // Redirect to home page after successful signup
       /*  router.push('/main/home'); */
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  }

  function signIn(email, password) {
    // Check if the email address exists in Firebase Authentication
    fetchSignInMethodsForEmail(auth, email, password)
      .then((signInMethods) => {
        // If the email exists in Firebase Authentication, try to sign in with the provided email and password
        if (signInMethods.length > 0) {
          return signInWithEmailAndPassword(auth, email, password);
        } else {
          throw new Error('Email not found. Please sign up first.');
        }
      })
      .then(() => {
        // Redirect to home page after successful login
        /* router.push('/main/home'); */
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        // Redirect to login page after logout
        /* router.push('/main/home'); */
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect logged-in user to home page
        /* router.push('/main/home'); */
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    // pass all the functions as props so we can use them in our app components
    <AuthContext.Provider value={{ signIn, logOut, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext)
}