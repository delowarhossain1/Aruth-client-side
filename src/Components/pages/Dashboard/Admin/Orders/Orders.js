import React, { useEffect, useState } from "react";
import Loading from "../../../../shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import OrderCart from "./OrderCart";
import useAlert from "./../../../../../hooks/useAlert";

const Orders = () => {
  const [user, loading] = useAuthState(auth);
  const { successfulAlertWithAutoClose } = useAlert();
  const [reset, setReset] = useState(false);
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // get resent orders
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrdersInfo(data)
        setDataLoading(false);
      });
  }, [user, reset]);

  // get order by order number;
  const getOrderByOrderNum = (event) => {
    event.preventDefault();
    const orderNumber = event.target.orderNumber.value;

    if (orderNumber && !orderNumber.includes("#")) {
      const URL = `http://localhost:5000/search-order/${orderNumber}?email=${user?.email}`;
      fetch(URL, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((info) => {
          setOrdersInfo(info)
          setDataLoading(false);
        });
    } 
    else {
      successfulAlertWithAutoClose(
        "Please enter a valid order number without # (Hash)",
        "error"
      );
    }
  };

  if (loading || dataLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
        <h2 className="dashboard-title flex-1">
          <i className="fa-solid fa-cart-shopping text-green-300"></i> Orders
        </h2>
        {/* Search order by id */}

        <form
          className="flex-1 flex justify-center relative"
          onSubmit={getOrderByOrderNum}
        >
          <input
            type="text"
            name="orderNumber"
            placeholder="Order No. AR30504"
            autoComplete="off"
            autoFocus
            className="border border-green-400 w-full py-2 pl-4 outline-none rounded-full"
          />

          <button className="bg-green-300 absolute top-0 border right-0 py-2  rounded-full w-28 text-md">
            <i className="fa-solid fa-magnifying-glass mr-2"></i>
            Search
          </button>
        </form>

        <div className="flex-1 flex justify-around">
          <button onClick={() => setReset(! reset)} className='p-2'>
            <i className="fa-solid fa-arrows-rotate text-xl"></i>
          </button>

          <select
            className="border border-orange-300 p-1 rounded outline-none"
            defaultValue='all'
          >
            <option value="all" selected>
              All
            </option>
            <option value="todays">Todays</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* ================== Order info display ============== */}
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th># No.</th>
                <th>IMG</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ordersInfo?.map((order, index) => (
                <OrderCart key={order?._id} order={order} index={index} />
              ))}
            </tbody>
          </table>

          {/* if orders not available */}
          {ordersInfo?.length === 0 && (
            <div className="flex h-48 w-full justify-center items-center text-lg">
              No order received.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
