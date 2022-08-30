import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import Loading from "../../shared/Loading/Loading";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const defaultProfileImg = 'https://i.ibb.co/10JxYVW/user.png';

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-6">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#ffffff] ml-0 lg:ml-5 p-3 rounded shadow-lg">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>

          <Outlet />
        </div>
        <div className="drawer-side shadow-lg rounded">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="w-60 bg-base-100 text-base-content">
            <div className="flex items-center flex-col gap-0 border-b-2 p-2 mb-2">
              <img
                src={user?.photoURL || defaultProfileImg}
                alt="profile"
                className=" w-14 h-14 bg-slate-200 p-1 rounded-full mb-1"
              />
              <div className="text-center ">
                <h2 className="text-md">
                  {user?.displayName?.length > 15
                    ? user?.displayName?.slice(0, 15) + "..."
                    : user?.displayName}
                </h2>
              </div>
            </div>

            <li className="dashboard-main-menu">
              <Link to="/dashboard" className="block">
                <i className="fa-solid fa-chart-line mr-2"></i>
                Report
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="orders" className="block">
                <i className="fa-solid fa-cart-shopping mr-2"></i>
                Orders
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="products" className="block">
                <i className="fa-solid fa-store mr-2"></i>
                Products
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="add-new-product" className="block">
                <i className="fa-solid fa-square-plus mr-2"></i>
                Add product
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="sliders" className="block">
                <i class="fa-solid fa-sliders mr-2"></i>
                Sliders
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="categories" className="block">
                <i className="fa-solid fa-dolly mr-2"></i>
                Categories
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="admins" className="block">
                <i className="fa-solid fa-user-check mr-2"></i>
                Admins
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="users" className="block">
                <i className="fa-solid fa-users mr-2"></i>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
