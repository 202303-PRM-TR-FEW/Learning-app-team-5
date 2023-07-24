"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const CheckIcon = dynamic(() => import("@mui/icons-material/Check"));

function LevelFilter({ searchResult, setSearchResult }) {
  const [levels, setLevels] = useState([
    { value: "beginner", label: "Beginner", checked: false },
    { value: "intermediate", label: "Intermediate", checked: false },
    { value: "advanced", label: "Advanced", checked: false },
  ]);

  const handleLevelChange = (levelValue) => {
    const updatedLevels = levels.map((level) =>
      level.value === levelValue ? { ...level, checked: !level.checked } : level
    );
    setLevels(updatedLevels);

    const selectedLevels = updatedLevels.filter((level) => level.checked);

    let filteredResults = searchResult;

    if (selectedLevels.length > 0) {
      filteredResults = searchResult.filter((course) =>
        selectedLevels.some((level) => course.level === level.value)
      );
    }

    setSearchResult(filteredResults);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 py-2">LEVEL</h3>
      <div className="grid grid-flow-col auto-cols-max gap-6">
        {levels.map((level) => (
          <div key={level.value} className="flex items-start">
            <CheckIcon
              className={`w-4.5 h-4.5 absolute ${level.checked ? "opacity-100" : "opacity-0"
                }`}
            />
            <input
              type="checkbox"
              value={level.value}
              className="w-6 h-6 appearance-none border-2 rounded-lg border-gray-300 relative"
              onChange={() => handleLevelChange(level.value)}
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
