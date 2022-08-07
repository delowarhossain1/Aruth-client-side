import React from "react";
import profile from "../../../Images/icon/woman.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <section className="py-6">
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content bg-[#ffffff] ml-0 lg:ml-5 p-3 rounded shadow-lg">
          <label
            for="my-drawer-2"
            class="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>

          <Outlet />
        </div>
        <div class="drawer-side shadow-lg rounded">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="overflow-y-auto w-60 bg-base-100 text-base-content">
            <div className="flex items-center flex-col gap-0 border-b-2 p-2 mb-2">
              <img
                src={profile}
                alt="profile"
                className=" w-14 h-14 bg-slate-200 p-1 rounded-full mb-1"
              />
              <div className="text-center ">
                <h2 className="text-md">
                  {user?.displayName.length > 15
                    ? user?.displayName.slice(0, 15) + "..."
                    : user?.displayName}
                </h2>
              </div>
            </div>

            <li className="dashboard-main-menu">
              <Link to="/dashboard" className="block">
                <i class="fa-solid fa-chart-line mr-2"></i>
                Report
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
                <i class="fa-solid fa-cart-shopping mr-2"></i>
                Orders
              </Link>
            </li>
            
            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-store mr-2"></i>
                Products
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-square-plus mr-2"></i>
              Add product
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-bars mr-2"></i>
                Menu
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-dolly mr-2"></i>
                Categories
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-user-check mr-2"></i>
                Admins
              </Link>
            </li>

            <li className="dashboard-main-menu">
              <Link to="/" className="block">
              <i class="fa-solid fa-users mr-2"></i>
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
