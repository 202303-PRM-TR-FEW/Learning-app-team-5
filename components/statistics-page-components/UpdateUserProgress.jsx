// Import necessary Firebase libraries
'use client';
import React from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { createCoursesWithModules } from './CourseContent';
import { GetAllCourses } from '../../app/context/FetchAllCourses';
import ModuleContent from './ModuleContent';


// Function to fetch the "users" collection
const fetchUsersCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'mock-user-data'));
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return usersData;
  } catch (error) {
    console.error('Error fetching users collection:', error);
    return [];
  }
};

const MockUsers = () => {
  const [users, setUsers] = useState([]);
  const [courseModules, setCourseModules] = useState([]);
  const [ coursesWithModules, setCoursesWithModules ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const { Allcourses } = GetAllCourses();

  useEffect(() => {
    const getCourses = () => { 
      setCourses(Allcourses);
    };
    getCourses();
  }, [Allcourses]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await fetchUsersCollection();
      console.log(usersData); // Display the fetched users data in the console or store it in the component state
      setUsers(usersData);
    };

    fetchUsers();


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
    setCoursesWithModules(createCoursesWithModules(db, courses, courseModules));

  }, []);



// Function to update the user progress for each user in the "users" state
const updateUserProgress = async () => {
  try {

    for (const user of users) {
      // Create a progress object for the user
      const progress = {};

      // Loop through the courses and set initial progress as empty arrays for each course
      for (const course of courses) {
        progress[course.id] = new Array(course.modules.length).fill(false);
      }

      // Update the user's progress in the "users" collection
      await db.collection('users').doc(user.id).update({ progress });

      console.log(`User "${user.username}" progress has been updated.`);
    }
  } catch (error) {
    console.error('Error updating user progress:', error);
  }
};







  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MockUsers;




  