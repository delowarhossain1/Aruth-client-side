import React from "react";
import RatingsStar from './../Ratings/RatingsStar';

const ProductCart = () => {
  return (
    <div className="bg-white cursor-pointer shadow rounded">
      <img src="https://static-01.daraz.com.bd/p/e7c22d8b523955351ed3b7529dd44843.jpg" alt="product" />

      <div className="p-2 my-3">
        <h2 className="text-lg">Lorem ipsum dolor sit amet consectetur.....</h2>
        <h3 className="text-2xl my-1">$120</h3>
        <h4 className="text-sm text-gray-400 mb-2">
          <strike>$22</strike> - 65%
        </h4>

        <RatingsStar star={2.2} />
      </div>
    </div>
  );
};

export default ProductCart;
