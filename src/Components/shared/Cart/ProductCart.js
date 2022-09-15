import React from "react";
import Taka from "../Taka/Taka";
import RatingsStar from "./../Ratings/RatingsStar";
import "./ProductCart.css";

const ProductCart = ({ product }) => {
  const { _id, img, name, ratings, price } = product;

  // Product name;
  const productName = name?.length > 250 ? name.slice(0, 20) + "......" : name;

  return (
    <div>
      <a href={`/product-details/${_id}`} className="h-full">
        <div
          className="bg-white cursor-pointer  rounded hover:shadow-lg shadow-black flex flex-col justify-between product-cart-custom h-full"
        >
          <div>
            <img src={img} alt="product" className=" w-full mb-2" />

            <h2 className="text-md px-2 mb-2">
              {productName?.length > 25
                ? productName?.slice(0, 25) + "..."
                : productName}
            </h2>
          </div>

          <div>
            <div className="px-2 mb-3">
              <h3 className="text-xl my-2 flex items-center text-primary">
                <Taka className="w-4 mr-1" /> {price}
              </h3>

              <RatingsStar star={ratings} />
            </div>

            <div>
              <button className="py-1 bg-primary w-full text-white product-card-btn">
                View Details
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCart;
