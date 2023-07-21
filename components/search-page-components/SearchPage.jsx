"use client";
import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import CategoriesFilter from "./CategoriesFilter";
import RatingFilter from "./RatingFilter";
import LevelFilter from "./LevelFilter";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { db } from "../../firebase";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const q = query(collection(db, "course-data"));
        const querySnapshot = await getFirestore(q);

        const searchResultArray = [];
        const levelsArray = [];
        const categoriesArray = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          searchResultArray.push({ ...data, id: doc.id });


          if (!levelsArray.includes(data.level)) {
            levelsArray.push(data.level);
          }


          if (!categoriesArray.includes(data.category)) {
            categoriesArray.push(data.category);
          }
        });

        setSearchResult(searchResultArray);
        setOriginalData(searchResultArray);
        setLevels(levelsArray);
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const handleLevelChange = (levelValue) => {
    const updatedLevels = levels.map((level) =>
      level.value === levelValue ? { ...level, checked: !level.checked } : level
    );
    setLevels(updatedLevels);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);

    const filteredResults = searchResult.filter(
      (course) => course.category === category
    );
    setSearchResult(filteredResults);
  };

  const handleRatingChange = (newValue) => {

    const filteredResults = originalData.filter(
      (course) => course.rating >= newValue
    );
    setSearchResult(filteredResults);
  };

  const filterData = (searchTerm) => {

    const courseSearchResults = originalData.filter((course) =>
      Object.values(course).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setSearchResult(courseSearchResults);
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
      />
      <LevelFilter levels={levels} onChange={handleLevelChange} />
      <RatingFilter onChange={handleRatingChange} />
      <div className="text-sm font-semibold text-gray-700 py-2 mb-8 mt-2">
        <h3>RECOMMENDED FOR YOU</h3>
        <SearchResults searchResult={searchResult} />
      </div>
    </>
  );
}

export default SearchPage;
