import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCart = ({ order, index }) => {
  const { productImg, productName, productQuantity, status, date, _id } = order;
  const navigate = useNavigate();

  return (
    <tr>
      <th>{index + 1}</th>

      <td>
        <img src={productImg} alt="product" className=" w-10 h-10" />
      </td>
      <td>
        {productName?.length > 20
          ? productName.slice(0, 10) + "..."
          : productName}
      </td>
      <td className="text-md">{productQuantity}</td>
      <td className="text-md">{status}</td>
      <td className="text-md">{date}</td>
      <td>
        <button
          className="bg-green-300 p-2 rounded"
          onClick={() => navigate(`/dashboard/order-details/${_id}`)}
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default OrderCart;
