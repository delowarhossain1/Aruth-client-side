import React, { useEffect, useState } from "react";
import Loading from "../../../../shared/Loading/Loading";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../../../../firebase.init";
import OrderCart from "./OrderCart";

const Orders = () => {
  const [user, loading] = useAuthState(auth);
  const [ordersInfo, setOrdersInfo] = useState([]);

  useEffect(()=>{
      fetch(`http://localhost:5000/orders?email=${user?.email}`, {
        headers : {
          auth : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => res.json())
      .then(data => setOrdersInfo(data));
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
        <h2 className="dashboard-title flex-1"><i className="fa-solid fa-cart-shopping text-green-300"></i> Orders</h2>
        {/* Search order by id */}

        <div className="flex-1 flex justify-center relative">
            <input type="text" placeholder="Order No. #A30504" className="border border-green-400 w-full py-2 px-2 outline-none rounded-full" />
            <button className="bg-green-300 absolute top-0 border right-0 py-2  rounded-full w-28 text-md">
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              Search
            </button>
        </div>

        <div className="flex-1 flex justify-end">
            {/* <select name="" id="" className="border border-orange-300 p-1 rounded outline-none" defaultValue>
              <option value="" selected>All</option>
              <option value="">Todays</option>
              <option value="">Pending</option>
              <option value="">Shipped</option>
              <option value="">delivered</option> */}
            {/* </select> */}
        </div>

      </div>

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
                 <OrderCart key={order?._id} order={order} index={index}/>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </section>
  );
};

export default Orders;
