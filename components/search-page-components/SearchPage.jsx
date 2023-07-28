"use client";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import CategoriesFilter from "./CategoriesFilter";
import RatingFilter from "./RatingFilter";
import LevelFilter from "./LevelFilter";
import TopSearches from "./TopSearches";
import { GetAllCourses } from "../../app/context/FetchAllCourses";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { Allcourses } = GetAllCourses();

  const [recentSearches, setRecentSearches] = useState([]);

  const filterData = (searchTerm) => {
    console.log("Original data:", Allcourses);
    console.log("Search term:", searchTerm);

    const courseSearchResults = Allcourses.filter((course) =>
      Object.values(course).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    console.log("Filtered results:", courseSearchResults);
    setSearchResult(courseSearchResults);
  };

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handleSearchSubmit = (searchTerm) => {
    setSearch(searchTerm);
    filterData(searchTerm);
    setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
  };

  const handleCategoryChange = (categoryValue, isChecked) => {
    // Filter the search result based on the selected category
    if (isChecked) {
      const filteredResults = searchResult.filter(
        (course) => course.category === categoryValue
      );
      setSearchResult(filteredResults);
    } else {
      const filteredResults = searchResult.filter(
        (course) => course.category !== categoryValue
      );
      setSearchResult(filteredResults);
    }
  };

  const handleLevelChange = (levelValue, isChecked) => {
    // Filter the search result based on the selected category
    if (isChecked) {
      const filteredResults = searchResult.filter(
        (course) => course.level === levelValue
      );
      setSearchResult(filteredResults);
    } else {
      const filteredResults = searchResult.filter(
        (course) => course.level !== levelValue
      );
      setSearchResult(filteredResults);
    }
  };

  const handleRatingChange = (newValue) => {
    // Filter the search results based on the selected rating value
    const filteredResults = Allcourses.filter(
      (course) => course.rating >= newValue
    );
    setSearchResult(filteredResults);
  };

  return (
    <>
      <h2 className="text-xl text-gray-900 dark:text-white font-semibold">
        Find your favourites
      </h2>
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      <TopSearches recentSearches={recentSearches} onSearchClick={handleSearchSubmit} />
      <CategoriesFilter handleCategoryChange={handleCategoryChange} />
      <LevelFilter handleLevelChange={handleLevelChange} />
      <RatingFilter
        onChange={handleRatingChange}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <div className="text-sm font-semibold text-gray-700 dark:text-bodyWhite py-2 mb-8 mt-2">
        <h3>Search Results</h3>
        <SearchResults searchResult={searchResult} />
      </div>
    </>
  );
}

export default SearchPage;
