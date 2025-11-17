import  { useEffect, useState } from "react";
import "./Star.css"; // Add relevant CSS styles

type Star={
    value:number,
    big?:boolean
}

const StarDisplay = ({value,big}:Star) => {
  const [rating,setRating] = useState<number>(0);
  useEffect(()=>
  {
    setRating(value)
  },[value])
  return (
    <div className="star-rating ">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1; // Star values from 1 to 5
        return (
          <button
            type="button"
            key={index}
            className={
              starValue <= ( Math.floor(rating))
                ? "on" // Fully filled star
                : starValue === Math.ceil(rating) && rating % 1 >= 0.5
                ? "half" // Half-filled star
                : "off" // Empty star
            }
            
          >
            <span className={`${big?'star star-big':'star star-small'}`}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarDisplay;