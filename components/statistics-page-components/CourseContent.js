'use client'
import { useContext, createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase'; 

const FetchCourseContentContext = createContext();

export const CoursesContextProvider = ({ children }) => {
    const [courseModules, setCourseModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "course-modules"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const courseContentArray = [];

            querySnapshot.forEach((doc) => {
                courseContentArray.push({ ...doc.data(), id: doc.id });
            });

            setCourseModules(courseContentArray);
            setIsLoading(false);
        }, (error) => {
            setError(error); // Handle errors in the snapshot listener
            setIsLoading(false); // In case of error, still set isLoading to false
        });

        return () => unsubscribe();
    }, []);

    return (
        <FetchCourseContentContext.Provider value={{ courseModules, isLoading, error }}>

            {children}
        </FetchCourseContentContext.Provider>
    );
};

export const GetCourseModules = () => {
    console.log(useContext(FetchCourseContentContext));
    return useContext(FetchCourseContentContext);
};

export const createCoursesWithModules = async (db, courses, modules) => {
    try {
        const coursesWithModules = [];
        for (let i=0; i<courses.length; i++) {
            const course = courses[i];
            const modulesForCourse = modules.filter(module => module.moduleID === course.id);
            coursesWithModules.push({ ...course, modules: modulesForCourse });
            console.log(`Course "${course.title}" has been added with module references.`);
        }
        console.log(coursesWithModules);
        return coursesWithModules;
    }
    catch (error) {
        console.error("Error creating courses with modules: ", error);
}
}
