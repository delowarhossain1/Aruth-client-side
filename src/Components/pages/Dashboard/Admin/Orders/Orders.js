import React, { useEffect, useState } from "react";
import Loading from "../../../../shared/Loading/Loading";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../../../../firebase.init";

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
  }, [user])

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="">
      <h2 className="dashboard-title">Orders</h2>

      <div>
        <div class="overflow-x-auto">
          <table class="table w-full text-center">
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
                <tr key={order?._id}>
                  <th>{index + 1}</th>

                  <td>
                      <img src={order?.productImg} alt="product" className=" w-10 h-10" />
                  </td>
                  <td>
                    {order?.productName?.length > 20
                      ? order?.productName.slice(0, 10) + "..."
                      : order?.productName}
                  </td>
                  <td className="text-md">{order?.productQuantity}</td>
                  <td className="text-md">{order?.status}</td>
                  <td className="text-md">{order?.date}</td>
                  <td>
                    <select>
                      <option selected>Action</option>
                      <option>Details</option>
                      <option>Delete</option>

                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Orders;
