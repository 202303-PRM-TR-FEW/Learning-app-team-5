"use client";
import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import CategoriesFilter from "./CategoriesFilter";
import RatingFilter from "./RatingFilter";
import LevelFilter from "./LevelFilter";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [levels, setLevels] = useState([
    { value: "beginner", label: "Beginner", checked: false },
    { value: "intermediate", label: "Intermediate", checked: false },
    { value: "advanced", label: "Advanced", checked: false },
  ]);

  const [categories, setCategories] = useState([]);

  const coursesRef = collection(db, "course-data");

  // Fetch all courses from Firebase and store them in the "originalData" state
  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(coursesRef);
      const courses = querySnapshot.docs.map((doc) => doc.data());
      setOriginalData(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch courses based on the category
  const fetchCoursesByCategory = async (category) => {
    try {
      const q = query(coursesRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const courses = querySnapshot.docs.map((doc) => doc.data());
      setSearchResult(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    // Fetch all courses when the component mounts
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.value === category
          ? { ...cat, checked: !cat.checked }
          : { ...cat, checked: false }
      )
    );
    // Fetch courses based on the selected category
    fetchCoursesByCategory(category);
  };

  const handleRatingChange = (newValue) => {
    // Filter the search results based on the selected rating value
    const filteredResults = originalData.filter(
      (course) => course.rating >= newValue
    );
    setSearchResult(filteredResults);
  };

  const handleLevelChange = (levelValue) => {
    const filteredResults = searchResult.filter(
      (course) => course.level === levelValue
    );
    setSearchResult(filteredResults);
  };

  const filterData = (searchTerm) => {
    // Filter based on the search term
    const courseSearchResults = originalData.filter((course) =>
      Object.values(course).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Filter based on selected levels and categories

    const selectedCategories = categories.filter((cat) => cat.checked);

    let filteredResults = courseSearchResults;

    if (selectedCategories.length > 0) {
      filteredResults = filteredResults.filter((course) =>
        selectedCategories.some((cat) => course.category === cat.value)
      );
    }

    setSearchResult(filteredResults); // Update the search result state
  };

  return (
    <>
      <h2 className="text-xl text-gray-900 font-semibold">
        Find your favourites
      </h2>
      <SearchInput value={search} onChange={handleChange} />
      <CategoriesFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <LevelFilter
        levels={levels}
        onChange={handleLevelChange}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <RatingFilter
        onChange={handleRatingChange}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <div className="text-sm font-semibold text-gray-700 py-2 mb-8 mt-2">
        <h3>RECOMMENDED FOR YOU</h3>
        <SearchResults searchResult={searchResult} />
      </div>
    </>
  );
}

export default SearchPage;
