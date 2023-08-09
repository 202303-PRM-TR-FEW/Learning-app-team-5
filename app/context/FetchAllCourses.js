'use client'
import { useContext, createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

const FetchCoursesContext = createContext();

export const CoursesContextProvider = ({ children }) => {
    const [Allcourses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "course-data"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const coursesArray = [];

            querySnapshot.forEach((doc) => {
                coursesArray.push({ ...doc.data(), uid: doc.id });
            });

            setCourses(coursesArray);
            setIsLoading(false);
        }, (error) => {
            setError(error); // Handle errors in the snapshot listener
            setIsLoading(false); // In case of error, still set isLoading to false
        });

        return () => unsubscribe();
    }, []);

    return (
        <FetchCoursesContext.Provider value={{ Allcourses, isLoading, error }}>

            {children}
        </FetchCoursesContext.Provider>
    );
};

export const GetAllCourses = () => {
    return useContext(FetchCoursesContext);
};
