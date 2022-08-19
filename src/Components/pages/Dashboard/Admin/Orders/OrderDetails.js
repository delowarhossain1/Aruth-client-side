import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import Loading from "../../../../shared/Loading/Loading";

const OrderDetails = () => {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/order-details/${id}?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrderInfo(data));
  }, [id, user]);

  if (loading) {
    return <Loading />;
  }

  const {
    customer,
    email,
    mob,
    address,
    zipCode,
    productImg,
    productName,
    productQuantity,
    status,
    date,
    paid,
    transactionId,
  } = orderInfo;

  return (
    <section>
      <h2 className="text-lg">Order Details of - {productName}</h2>
      <h5 className="text-sm">Placed on {date}</h5>

      <div className="flex flex-col lg:flex-row bg-gray-100 mt-5 p-3    ">
        <img src={productImg} alt="product" className="w-52" />

        <div className="ml-5">
          <h2 className="font-semibold mb-2">Invoice</h2>
          <p className="text-sm">
            {productName?.length > 40
              ? productName.slice(0, 40) + "..."
              : productName}
          </p>
          <p className="text-sm">Quantity : {productQuantity}</p>
          <p className="text-sm">Payment status : {paid ? "Paid" : "Unpaid"}</p>
          <p className="text-sm">Total Paid : {paid ? "Paid" : "Unpaid"}</p>
          <p className="text-sm">Transition ID : {transactionId}</p>
          <p className="text-sm">Order status : {status}</p>
          <p className="text-sm">Order No. : {transactionId}</p>
          <p className="text-sm">Placed on : {date}</p>
          <p className="text-sm">Customer : {customer}</p>
          <p className="text-sm">Mobile : {mob}</p>
          <p className="text-sm">Email : {email}</p>
          <p className="text-sm">Address : {address}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col lg:flex-row space-x-0 lg:space-x-5">
        <div className="bg-gray-100 p-2 rounded flex-1">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p className="text-sm">Customer : {customer}</p>
          <p className="text-sm">Mobile : {mob}</p>
          <p className="text-sm">Email : {email}</p>
          <p className="text-sm">Zip code : {zipCode}</p>
          <p className="text-sm">Address : {address}</p>
        </div>

        <div className="flex-1 bg-gray-100 p-2 rounded">
          <h2 className="font-semibold mb-2">Take Action</h2>

          <select className="select w-full" defaultValue='title'>
            <option disabled value='title'>
              Set Order Status
            </option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Cancel</option>
          </select>

          <div className="flex items-center justify-around">
            <button className="bg-[#fb5200] p-2  rounded text-white mt-8 float-right">
                <i className="fa-solid fa-trash-can mr-2"></i>
                Delete order
            </button>

            <button className="bg-[#3B82F6] p-2  rounded text-white mt-8 float-right">
              <i className="fa-solid fa-bolt mr-2"></i>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
