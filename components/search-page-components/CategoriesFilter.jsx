"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GetAllCourses } from "../../app/context/FetchAllCourses";

const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));

function CategoriesFilter({ handleCategoryChange,t }) {
  const { Allcourses } = GetAllCourses();

  const [categories, setCategories] = useState([]);

  // Fetch all categories when Allcourses data is available
  useEffect(() => {
    if (Allcourses && Allcourses.length > 0) {
      const allCategories = Array.from(
        new Set(
          Allcourses.map((course) => capitalizeFirstLetter(course.category))
        )
      );
      setCategories(
        allCategories.map((category) => ({
          value: category,
          label: category,
          checked: false,
        }))
      );
    }
  }, [Allcourses]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // Function to handle category change
  const handleChange = (event) => {
    const { value, checked } = event.target;

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.value === value ? { ...category, checked } : category
      )
    );

    handleCategoryChange(value, checked);
  };

  return (
    <div className=" text-gray-700 dark:text-bodyWhite">
      <hr />
      <h3 className="text-md font-semibold py-4">{t("title-2")}</h3>

      <div className="grid grid-flow-col auto-cols-max gap-4  mb-8 mt-2">
        {categories.map((category) => (
          <div key={category.value} className="flex items-start">
            <CheckIcon
              className={`w-5 h-5 absolute ${
                category.checked ? "opacity-100" : "opacity-0"
              }`}
            />
            <input
              type="checkbox"
              value={category.value}
              className="w-5 h-5 appearance-none border-2 rounded-lg border-gray-300 relative"
              onChange={handleChange}
              checked={category.checked}
            />
            <label className="px-2.5" htmlFor={category.value}>
              {category.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesFilter;
