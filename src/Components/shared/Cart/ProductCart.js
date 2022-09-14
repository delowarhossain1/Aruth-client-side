import React from "react";
import { useNavigate } from "react-router-dom";
import Taka from "../Taka/Taka";
import RatingsStar from "./../Ratings/RatingsStar";

const ProductCart = ({ product }) => {
  const { _id, img, name, ratings, price, discount } = product;
  const navigate = useNavigate();

  // Product name;
  const productName = name?.length > 250 ? name.slice(0, 20) + "......" : name;
  const calculatePrice = price + price / discount;
  const mainPrice = Math.round(calculatePrice);

  return (
    <div
      className="bg-white cursor-pointer shadow rounded hover:shadow-lg flex flex-col justify-between"
      onClick={() => navigate(`/product-details/${_id}`)}
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
          <h3 className="text-xl my-2 flex items-center text-orange-500">
            <Taka /> {price}
          </h3>

          <RatingsStar star={ratings} />
        </div>

        <div>
          <button className="py-1 bg-orange-500 w-full text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
