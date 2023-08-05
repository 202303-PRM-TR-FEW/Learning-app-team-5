import React, { useState, useEffect } from 'react';
import { db } from '@/firebase'; // Replace with the actual path to your firebaseConfig file
import { collection, getDocs } from 'firebase/firestore';
import ModuleContent from './ModuleContent';
import { createCoursesWithModules } from './CourseContent';
import { GetAllCourses } from '../../app/context/FetchAllCourses';


const CourseModules = () => {
  const [courseModules, setCourseModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [courses, setCourses] = useState([]);
  const { Allcourses } = GetAllCourses();

  useEffect(() => {
    const getCourses = () => { 
      setCourses(Allcourses);
    };
    getCourses();
  }, [Allcourses]);

  useEffect(() => {
    const fetchCourseModules = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'course-modules'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourseModules(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching course modules:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCourseModules();
    createCoursesWithModules(db, courses, courseModules);
    // console.log(courseModules)
  }, []);


  // Render the fetched data conditionally
  return (
    <div>
      <h1>Course Modules</h1>
      {isLoading ? (
        <p>Loading...</p> // Show a loading state while fetching data
      ) : courseModules.length === 0 ? (
        <p>No course modules available.</p> // Show a message if there are no course modules
      ) : (
        <div>
        {courseModules.map((moduleItem) => (
          <div key={moduleItem.moduleID}>
            {moduleItem.modules.map((module) => (
              <ModuleContent key={module.moduleId} module={module} />
            ))}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CourseModules;
