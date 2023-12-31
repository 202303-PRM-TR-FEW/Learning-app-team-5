"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetAllCourses } from "../../app/context/FetchAllCourses";

const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));

function LevelFilter({ handleLevelChange, t }) {
  const { Allcourses } = GetAllCourses();

  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (Allcourses && Allcourses.length > 0) {
      const allLevels = Array.from(
        new Set(Allcourses.map((course) => capitalizeFirstLetter(course.level)))
      );
      setLevels(
        allLevels.map((level) => ({
          value: level,
          label: level,
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

    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.value === value ? { ...level, checked } : level
      )
    );

    handleLevelChange(value, checked);
  };

  return (
    <div className="text-gray-700 dark:text-bodyWhite">
      <h3 className="text-md font-semibold ">{t("title-3")}</h3>
      <div className="flex flex-wrap gap-6 py-4">
        {levels.map((level) => (
          <div key={level.value} className="flex items-center">
            <CheckIcon
              className={`w-4.5 h-4.5 absolute ${
                level.checked ? "opacity-100" : "opacity-0"
              }`}
            />
            <input
              type="checkbox"
              value={level.value}
              className="w-6 h-6 appearance-none border-2 rounded-lg border-gray-300 relative"
              onChange={handleChange}
              checked={level.checked}
            />
            <label className="px-2.5 text-xl" htmlFor={level.value}>
              {level.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelFilter;
