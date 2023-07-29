import React from "react";

function TopSearches({ recentSearches, onSearchClick }) {
  const handleSearchClick = (searchTerm) => {
    onSearchClick(searchTerm);
  };

  

  return (
    <div className="mb-8 text-gray-700 dark:text-bodyWhite">
      <h3 className="text-md font-semibold  py-4">Recent Searches</h3>
      <ul className="flex justify-start py-6">
        {recentSearches.map((searchTerm, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-indigoDay w-fit h-10 rounded-2xl px-4 py-2 text-center cursor-pointer mx-4"
            onClick={() => handleSearchClick(searchTerm)}
          >
            {searchTerm}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSearches;
