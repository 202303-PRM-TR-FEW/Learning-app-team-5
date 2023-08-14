'use client'
import { useContext, createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

const FetchUsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const q = query(collection(db, "users"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersArray = [];

            querySnapshot.forEach((doc) => {
                usersArray.push({ ...doc.data(), id: doc.id });
            });

             setUsers(usersArray);
            setIsLoading(false);
        }, (error) => {
            setError(error); // Handle errors in the snapshot listener
            setIsLoading(false); // In case of error, still set isLoading to false
        });

        return () => unsubscribe();
    }, []);

    return (
        <FetchUsersContext.Provider value={{ users, isLoading, error }}>

            {children}
        </FetchUsersContext.Provider>
    );
};

export const GetAllUsers = () => {
    return useContext(FetchUsersContext);
};
