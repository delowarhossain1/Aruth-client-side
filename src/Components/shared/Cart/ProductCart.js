import React from "react";
import { useNavigate } from "react-router-dom";
import RatingsStar from './../Ratings/RatingsStar';

const ProductCart = ({product}) => {
    const {_id, img, name, ratings, price, discount} = product;
    const navigate = useNavigate();

    console.log(product);
    // Product name;
    const productName = name?.length > 250 ? name.slice(0, 20) + "......" : name; 

  return (
    <div className="bg-white cursor-pointer shadow rounded hover:shadow-lg" onClick={()=> navigate(`/product-details/${_id}`)}>
      <img src={img} alt="product" />

      <div className="p-2 my-3">
        <h2 className="text-lg">{productName}</h2>
        <h3 className="text-2xl my-1">${price}</h3>
        <h4 className="text-sm text-gray-400 mb-2">
          <strike>${discount}</strike> - 65%
        </h4>

        <RatingsStar star={ratings} />
      </div>
    </div>
  );
};

export default ProductCart;
