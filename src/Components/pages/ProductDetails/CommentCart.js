import React from "react";
import RatingsStar from "../../shared/Ratings/RatingsStar";

const CommentCart = ({ comment }) => {
  const { email, ratings, text } = comment;

  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <img
          src="http://localhost:3000/static/media/male.697e97cdd2d0c4819b57.png"
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
