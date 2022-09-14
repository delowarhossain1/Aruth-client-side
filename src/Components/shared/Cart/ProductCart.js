import React from "react";
import { useNavigate } from "react-router-dom";
import Taka from "../Taka/Taka";
import RatingsStar from "./../Ratings/RatingsStar";

const ProductCart = ({ product }) => {
  const { _id, img, name, ratings, price, discount } = product;
  const navigate = useNavigate();

  // Product name;
  const productName = name?.length > 250 ? name.slice(0, 20) + "......" : name;

  return (
    <div
      className="bg-white cursor-pointer shadow rounded hover:shadow-lg flex flex-col justify-between"
      onClick={() => navigate(`/product-details/${_id}`)}
    >
      <div>
        <img src={img} alt="product" className=" w-full mb-2" />

        <h2 className="text-md px-2">
          {productName?.length > 25
            ? productName?.slice(0, 25) + "..."
            : productName}
        </h2>
      </div>

      <div className="px-2 mb-3">
        
        <h3 className="text-xl my-1 flex items-center text-orange-500"><Taka /> {price}</h3>
        <h4 className="text-sm text-gray-400 mb-2">
          <strike>${discount}</strike> - 65%
        </h4>

        <RatingsStar star={ratings} />
      </div>
    </div>
  );
};

export default ProductCart;
