import React from "react";
import RatingsStar from "../../shared/Ratings/RatingsStar";

const CommentCart = ({ comment }) => {
  const { email, ratings, text, img } = comment;

  return (
    <div className="mb-7">
      <div className="flex items-center mb-2">
        <img
          src={img}
          alt="profile"
          className="w-10 h-10 rounded-full border p-1"
        />

        <div className="ml-2 ">
          <h2 className="mt-1">
            {email.slice(0, 2)}*****
            {email.slice(email.length - 6, email.length)}
          </h2>
          <h5 className="text-xs">
            <i className="fa-solid fa-circle-check text-xs text-green-500 mr-1"></i>
            Verified Purchase
          </h5>
        </div>
      </div>

      <RatingsStar star={ratings} styles="text-xs" />

      <p className="mt-1">{text}</p>
    </div>
  );
};

export default CommentCart;
