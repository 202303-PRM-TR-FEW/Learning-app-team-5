"use client";
import React from "react";

function SearchInput({ value, onChange, handleChange }) {
  return (
    <form className="my-8">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="font-medium rounded-lg pl-px pr-8 py-1.5 mr-2 mb-2 border border-gray-300"
      />
      <button type="submit" onClick={handleChange} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
