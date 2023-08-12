"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@mui/material/Box"));
const Rating = dynamic(() => import("@mui/material/Rating"));
const StarIcon = dynamic(() => import("@mui/icons-material/Star"));

function RatingFilter({ searchResult, setSearchResult,t }) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1}`;
  }

  const handleRatingChange = (newValue) => {
    setValue(newValue);
    const filteredResults = searchResult.filter(
      (course) => course.rating <= newValue
    );
      setSearchResult(filteredResults);
  };

  return (
    <>
      <hr />
      <div className="grid grid-flow-col text-gray-700 py-2">
        <div>
          <h3 className="text-md font-semibold text-gray-700 dark:text-bodyWhite py-4">
            {t("title-4")}
          </h3>

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
                <StarIcon
                  style={{ opacity: 0.55 }}
                  fontSize="inherit"
                  className="dark:text-white"
                />
              }
              icon={
                <StarIcon style={{ color: "#2196f3" }} fontSize="inherit" />
              }
            />
          </Box>
        </div>
      </div>
    </>
  );
}

export default RatingFilter;
