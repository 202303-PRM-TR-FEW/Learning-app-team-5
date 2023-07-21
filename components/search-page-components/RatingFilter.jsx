"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';

const Box = dynamic(() => import("@mui/material/Box"));
const Rating = dynamic(() => import("@mui/material/Rating"));
const StarIcon = dynamic(() => import("@mui/icons-material/Star"));

function RatingFilter({ searchResult, setSearchResult }) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: "",
    1: "",
    1.5: "",
    2: "",
    2.5: "",
    3: "",
    3.5: "",
    4: "",
    4.5: "",
    5: "",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleRatingChange = (newValue) => {
    setValue(newValue);
    const filteredResults = searchResult.filter(
      (course) => course.rating >= newValue
    );
    setSearchResult(filteredResults);
  };

  return (
    <>
      <hr />
      <div className="grid grid-flow-col text-gray-700 mb-8 mt-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 py-2">RATING</h3>

          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                handleRatingChange(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              icon={
                <StarIcon style={{ color: "#2196f3" }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default RatingFilter;
