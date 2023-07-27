"use client";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

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
    <div className=" text-gray-700 dark:text-bodyWhite">
      <hr />
      <h3 className="text-sm font-semibold py-2">CATEGORIES</h3>

      <div className="grid grid-flow-col auto-cols-max gap-4  mb-8 mt-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <CheckIcon
              className={`w-5 h-5 absolute ${
                selectedCategories[category] ? "opacity-100" : "opacity-0"
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
    </div>
  );
}

export default CategoriesFilter;
