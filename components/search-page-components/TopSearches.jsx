"use client";
import { useEffect, useState } from "react";

function TopSearches({ recentSearches, onSearchClick, t }) {
  const [uniqeValue, setUniqeValue] = useState([]); // Initialize as an empty array
  const [storedUniqe, setStoredUniqe] = useState([]);

  const handleSearchClick = (searchTerm) => {
    onSearchClick(searchTerm);
  };

  const unique = (value) => {
    let i = 0;
    while (i < value.length) {
      if (!uniqeValue.includes(value[i])) {
        setUniqeValue((prevUniqeValue) => [...prevUniqeValue, value[i]]); // Push the value into uniqeValue
      }
      i++;
    }
  };

  if (uniqeValue.length >= 1) {
    localStorage.setItem("RecentSearch", JSON.stringify(uniqeValue));
  }
  if (uniqeValue.length > 20) {
    localStorage.removeItem("RecentSearch");
  }

  if (storedUniqe > 7) {
    setStoredUniqe((prev) => prev.slice(0, 7));
  }

  useEffect(() => {
    unique(recentSearches);
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("RecentSearch"))
    ) {
      setStoredUniqe(JSON.parse(localStorage.getItem("RecentSearch")));
    }
  }, [recentSearches]);

  return (
    <div className=" text-gray-700 dark:text-bodyWhite">
      <h3 className="text-md font-semibold  py-2">{t("title-6")}</h3>
      <ul className="flex justify-start py-3">
        {storedUniqe ? (
          storedUniqe.map((searchTerm, index) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-indigoDay border-2 dark:border-1 dark:border-purssianBlue shadow-lg w-fit h-10 rounded-2xl px-4 py-2 text-center cursor-pointer mr-8"
              onClick={() => handleSearchClick(searchTerm)}
            >
              {searchTerm}
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default TopSearches;
