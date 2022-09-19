import React from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import Loading from "../../../../shared/Loading/Loading";
import DashboardTitle from "../../DashboardTitle";
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import Taka from '../../../../shared/Taka/Taka';

const MyProfile = () => {
    const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const URL = `http://localhost:5000/my-info?email=${user?.email}`;

    if (user?.email) {
      fetch(URL, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setUserInfo(res));
    }
  }, [user]);

  //   My resent orders
  const { data: myRecentOrders, isLoading } = useQuery(
    ["My-recent-orders", user],
    () =>
      fetch(`http://localhost:5000/my-recent-orders?email=${user?.email}`, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section className="">
      <DashboardTitle
        value={{ icon: "fa-regular fa-address-card", text: "My Profile" }}
      />

      <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-5 mt-5">
        <div className="bg-gray-50 flex-1 p-2 rounded shadow mb-3 lg:mb-0">
          <h5 className="text-lg font-semibold mb-2">
            Personal Profile |
            <span className="text-blue-400 cursor-pointer ml-1">Edit</span>
          </h5>

          <img
            src={user?.photoURL}
            alt="profile"
            className=" w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h5 className="text-center">{user?.displayName}</h5>
          <h5 className="text-center">{user?.email}</h5>
        </div>

        <div className="bg-gray-50 flex-1 p-2 rounded shadow">
          <h5 className="text-lg font-semibold mb-2">
            Address Book |{" "}
            <span className="text-blue-400 cursor-pointer">Edit</span>
          </h5>

          <h5>{userInfo?.name}</h5>
          <h5>{userInfo?.email}</h5>
          <h5>{userInfo?.mob}</h5>
          <p>{userInfo?.address}</p>
        </div>
      </div>

      <div className="mt-12">
        <h4 className="text-xl text-gray-500 mb-3">Recent Orders</h4>

        {myRecentOrders?.length > 0 && <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Placed On</th>
                <th>Items</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myRecentOrders?.map((order) => (
                <tr key={order?._id}>
                  <td>{order?.orderNum}</td>
                  <td>{order?.date}</td>
                  <td>
                    <img src={order?.productImg} alt="product" className=" w-10" />
                  </td>
                  <td>
                     <span className="flex items-center text-xl"><Taka className="w-4 mr-1" /> {order?.total}</span>
                  </td>
                  <td>
                    <button className="text-blue-400" onClick={()=> navigate(`/dashboard/my-order-details/${order?._id}`)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
              {/* If no orders available */}
        {
          myRecentOrders?.length === 0 && <div className="text-lg text-gray-500 h-24 flex justify-center items-center">No Orders..</div>
        }
      </div>
    </section>
  );
};

export default MyProfile;
