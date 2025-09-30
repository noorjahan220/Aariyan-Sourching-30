import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CustomStarRating = ({ numberOfStars = 5 }) => {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[...Array(numberOfStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={12}
            className="cursor-pointer transition-colors"
            color={
              starValue <= (hover || rating)
                ? "gold"
                : "#d1d5db" // Tailwind gray-300
            }
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default CustomStarRating;