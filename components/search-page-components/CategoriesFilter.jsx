"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));

function CategoriesFilter({ categories, onCategoryChange }) {
  const [selectedCategories, setSelectedCategories] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: false }), {})
  );

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
    onCategoryChange(category);
  };

  return (
    <>
      <hr />
      <h3 className="text-sm font-semibold text-gray-700 py-2">CATEGORIES</h3>

      <div className="grid grid-flow-col auto-cols-max gap-4 text-gray-700 mb-8 mt-2">
        {categories.map((category) => (
          <div key={category}>
            <CheckIcon
              className={`w-5 h-5 absolute ${selectedCategories[category] ? "opacity-100" : "opacity-0"
                }`}
            />
            <input
              type="checkbox"
              id={category}
              value={category}
              className="w-5 h-5 appearance-none border-2 rounded-lg border-gray-300 relative"
              onChange={() => handleCategoryChange(category)}
              checked={selectedCategories[category]}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesFilter;
