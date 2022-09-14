import React from "react";
import { Link } from "react-router-dom";

const CategoriesCart = ({ category }) => {
  const { link, img } = category;
  return (
    <div className="w-full">
      <Link to={link}>
        <div className="overflow-hidden rounded">
          <img
            src={img}
            alt="category"
            className=" hover:scale-[1.07] duration-1000  max-w-full"
          />
        </div>
      </Link>
    </div>
  );
};

export default CategoriesCart;
