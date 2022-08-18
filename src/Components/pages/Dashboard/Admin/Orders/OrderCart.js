import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCart = ({ order, index }) => {
  const { productImg, productName, productQuantity, status, date, _id } = order;
  const navigate = useNavigate();

  // Set action (delete & details)
  const getAction = (event) => {

    if (event?.target?.value === "details") {
    
        navigate(`/dashboard/order-details/${_id}`);

    }
    else if(event?.target?.value === 'delete'){
        
        console.log('i want to delete');
    }

  };

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
        <select
          className="outline-none border p-1 rounded"
          defaultValue="action"
          onChange={(e) => getAction(e)}
        >
          <option value="action">Action</option>
          <option value="details">Details</option>
          <option value="delete">Delete</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderCart;
