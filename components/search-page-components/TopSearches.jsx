import React from "react";

function TopSearches({ recentSearches, onSearchClick }) {
 const handleSearchClick = (searchTerm) => {
  onSearchClick(searchTerm);
 };

 return (
  <div className="mb-8">
   <h3 className="text-sm font-semibold text-gray-700 py-2">Top Searches</h3>
   <ul className="grid grid-cols-2 gap-2">
    {recentSearches.map((searchTerm, index) => (
     <li
      key={index}
      className="bg-gray-100 rounded-lg px-2 py-1 text-gray-700 cursor-pointer"
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
