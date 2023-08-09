"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Typography } from "@mui/material";
import { db } from "@/firebase";
import { updateDoc, doc } from "firebase/firestore";

const Box = dynamic(() => import("@mui/material/Box"));
const Rating = dynamic(() => import("@mui/material/Rating"));
const StarIcon = dynamic(() => import("@mui/icons-material/Star"));

const RatingStars = ({ courseID, setShowPopup }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1}`;
  }

  const handleRatingChange = async (newRate) => {
    const courseRef = doc(db, "course-data", courseID);
    await updateDoc(courseRef, {
      rating: newRate,
    });
    setShowPopup(false);
  };
  return (
    <div>
      <Typography component="legend"></Typography>
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
              className="dark:text-lightBlack"
            />
          }
          icon={<StarIcon style={{ color: "#2196f3" }} fontSize="inherit" />}
        />
      </Box>
    </div>
  );
};

export default RatingStars;
