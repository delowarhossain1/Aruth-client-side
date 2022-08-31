import React from "react";
import { Link } from "react-router-dom";

const MyOrderCard = ({ order = {} }) => {
  const {
    productImg,
    productName,
    productQuantity,
    size,
    status,
    orderNum,
    date,
  } = order;

  return (
    <div className="bg-gray-50 rounded p-3 shadow mb-5">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <div>
          <h4 className="text-md">Order #{orderNum}</h4>
          <h4 className="text-xs font-semibold">Placed on {date}</h4>
        </div>
        <Link to="/">
          <button className="font-semibold text-blue-500">Details</button>
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-7 gap-3">
        <div className="flex col-span-4">
          <img src={productImg} alt="product" className=" w-20 mr-2 rounded" />
          <h3>
            {productName?.length > 70
              ? productName?.slice(0, 70) + "...."
              : productName}
          </h3>
        </div>
        <div className="col-span-3 flex items-center justify-between">
          <div>
            <h3>Qty : {productQuantity}</h3>
            <h3>Size : {size}</h3>
          </div>

          <h5>{status}</h5>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
