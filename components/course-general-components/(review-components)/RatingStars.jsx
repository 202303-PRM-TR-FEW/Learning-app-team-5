import React, { useState } from "react";
import { Typography, Rating } from "@mui/material";

const RatingStars = ({ handleRatingChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (handleRatingChange) {
      handleRatingChange(newValue);
    }
  };

  return (
    <div>
      <Typography component="legend"></Typography>
      <Rating
        className="p-2"
        name="simple-controlled"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default RatingStars;
