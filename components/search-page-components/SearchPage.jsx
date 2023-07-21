"use client";
import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import CategoriesFilter from "./CategoriesFilter";
import RatingFilter from "./RatingFilter";
import LevelFilter from "./LevelFilter";
// import { collection, query, onSnapshot } from 'firebase/firestore';
// import { db } from '........';

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //  const q = query(collection(db, 'courses'));
  //  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const searchResultArray = [];
  //   querySnapshot.forEach((doc) => {
  //    searchResultArray.push({ ...doc.data(), id: doc.id });
  //   });
  //   setSearchResult(searchResultArray);
  //  });

  //  return () => unsubscribe();
  // }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);

    const courseSearchResults = searchResult.filter((course) =>
      course.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult(courseSearchResults);
  };

  //Categories Part
  const categories = ["Sales", "HR", "Drawing", "Big Data", "Design"];

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
  };

  //Level Part
  const [levels, setLevels] = useState([
    { value: "beginner", label: "Beginner", checked: false },
    { value: "intermediate", label: "Intermediate", checked: false },
    { value: "professional", label: "Professional", checked: false },
  ]);

  const handleLevelChange = (levelValue) => {
    const updatedLevels = levels.map((level) => {
      if (level.value === levelValue) {
        return { ...level, checked: !level.checked };
      }
      return level;
    });
    setLevels(updatedLevels);
  };

  return (
    <>
      <h2 className="text-xl text-gray-900 font-semibold">
        Find your favourites
      </h2>
      <SearchInput value={search} onChange={handleChange} />
      <SearchResults searchResult={searchResult} />
      <CategoriesFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <LevelFilter levels={levels} onChange={handleLevelChange} />
      <RatingFilter />
      <div className="text-sm font-semibold text-gray-700 py-2 mb-8 mt-2">
        <h3>RECOMMENDED FOR YOU</h3>
      </div>
    </>
  );
}

export default SearchPage;
