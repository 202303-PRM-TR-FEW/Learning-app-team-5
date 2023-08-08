"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import CategoriesFilter from "./CategoriesFilter";
import RatingFilter from "./RatingFilter";
import LevelFilter from "./LevelFilter";
import TopSearches from "./TopSearches";
import { GetAllCourses } from "../../app/context/FetchAllCourses";
import { useTranslations } from "next-intl";

function SearchPage() {
  const t = useTranslations("Search");

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { Allcourses } = GetAllCourses();

  const [recentSearches, setRecentSearches] = useState([]);

  const filterData = (searchTerm) => {
    const courseSearchResults = Allcourses.filter((course) =>
      Object.values(course).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setSearchResult(courseSearchResults);

    if (JSON.parse(localStorage.getItem("searchResult"))) {
      localStorage.removeItem("searchResult");
    }

    // Convert the filteredData array to a JSON string and store it in local storage
    localStorage.setItem("searchResult", JSON.stringify(courseSearchResults));
  };

  let storedSearchResult = "";

  if (
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("searchResult"))
  ) {
    storedSearchResult = JSON.parse(localStorage.getItem("searchResult"));
  }

  // Delete the locale storage on the page first load
  useEffect(() => {
    localStorage.removeItem("searchResult");
  }, []);

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
      let filteredResults = [];
      if (storedSearchResult) {
        filteredResults = storedSearchResult.filter(
          (course) =>
            course.category.toLowerCase() === categoryValue.toLowerCase()
        );
        filterdWithOutSerch = filteredResults;
      } else {
        filteredResults = Allcourses.filter(
          (course) =>
            course.category.toLowerCase() === categoryValue.toLowerCase()
        );
      }

      setSearchResult(filteredResults);
    } else {
      let filteredResults = [];
      if (storedSearchResult) {
        filteredResults = storedSearchResult.filter(
          (course) =>
            course.category.toLowerCase() !== categoryValue.toLowerCase()
        );
      } else {
        filteredResults = [];
      }
      setSearchResult(filteredResults);
    }
  };

  const handleLevelChange = (levelValue, isChecked) => {
    // Filter the search result based on the selected level
    if (isChecked) {
      let filteredResults = [];
      if (storedSearchResult) {
        filteredResults = storedSearchResult.filter(
          (course) => course.level === levelValue.toLowerCase()
        );
      } else if (searchResult) {
        filteredResults = searchResult.filter(
          (course) => course.level === levelValue.toLowerCase()
        );
      } else {
        filteredResults = Allcourses.filter(
          (course) => course.level === levelValue.toLowerCase()
        );
      }
      setSearchResult(filteredResults);
    } else {
      if (storedSearchResult) {
        setSearchResult(storedSearchResult);
      } else {
        setSearchResult([]);
      }
    }
  };

  return (
    <>
      <h2 className="text-xl text-gray-900 dark:text-white font-semibold">
        {t("title")}
      </h2>
      <SearchInput
        value={search}
        setSearch={setSearch}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        t={t}
      />
      <TopSearches
        recentSearches={recentSearches}
        onSearchClick={handleSearchSubmit}
        t={t}
      />
      <CategoriesFilter handleCategoryChange={handleCategoryChange} t={t} />
      <LevelFilter handleLevelChange={handleLevelChange} t={t} />
      <RatingFilter
        searchResult={storedSearchResult}
        setSearchResult={setSearchResult}
        t={t}
      />
      <div className="py-2 mb-3 ">
        <h3 className="text-md font-semibold text-gray-700 dark:text-bodyWhite">
          {t("title-5")}
        </h3>
        <SearchResults searchResult={searchResult} />
      </div>
    </>
  );
}

export default SearchPage;
