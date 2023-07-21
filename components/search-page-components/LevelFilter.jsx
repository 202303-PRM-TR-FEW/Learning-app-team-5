"use client";
import React from "react";
import dynamic from 'next/dynamic';

const CheckIcon = dynamic(() => import('@mui/icons-material/Check'));

function LevelFilter({ levels, onChange, searchResult, setSearchResult }) {
  const handleLevelChange = (levelValue) => {
    const filteredResults = searchResult.filter(
      (course) => course.level === levelValue
    );
    setSearchResult(filteredResults);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 py-2">LEVEL</h3>

      <div className="grid grid-flow-col auto-cols-max gap-6">
        {levels.map((level) => (
          <div key={level.value}>
            <CheckIcon
              className={`w-5 h-5 absolute ${level.checked ? "opacity-100" : "opacity-0"
                }`}
            />
            <input
              type="checkbox"
              id={level.value}
              value={level.value}
              className="w-5 h-5 appearance-none border-2 rounded-lg border-gray-300 relative"
              onChange={() => onChange(level.value)}
              checked={level.checked}
            />
            <label htmlFor={level.value}>{level.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelFilter;
