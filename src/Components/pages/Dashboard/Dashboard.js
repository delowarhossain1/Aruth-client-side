import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import Loading from "../../shared/Loading/Loading";
import useAdmin from "./../../../hooks/useAdmin";
import ActiveUser from "./ActiveUser";
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);

  const adminAccess = (
    <>
      <DashboardMenu
        value={{
          text: "Report",
          icon: "fa-solid fa-chart-line",
          link: "/dashboard",
        }}
      />

      <DashboardMenu
        value={{
          text: "Orders",
          icon: "fa-solid fa-cart-shopping",
          link: "orders",
        }}
      />

      <DashboardMenu
        value={{
          text: "Products",
          icon: "fa-solid fa-store",
          link: "products",
        }}
      />

      <DashboardMenu
        value={{
          text: "Add Product",
          icon: "fa-solid fa-square-plus",
          link: "add-new-product",
        }}
      />

      <DashboardMenu
        value={{
          text: "Sliders",
          icon: "fa-solid fa-sliders",
          link: "sliders",
        }}
      />

      <DashboardMenu
        value={{
          text: "Categories",
          icon: "fa-solid fa-dolly",
          link: "categories",
        }}
      />

      <DashboardMenu
        value={{
          text: "Admins",
          icon: "fa-solid fa-user-check",
          link: "admins",
        }}
      />

      <DashboardMenu
        value={{
          text: "Users",
          icon: "fa-solid fa-users",
          link: "users",
        }}
      />
    </>
  );

  // User Access links
  const userAccess = <>
       <DashboardMenu
        value={{
          text: "My Orders",
          icon: "fa-solid fa-bag-shopping",
          link: "/dashboard",
        }}
      />
       <DashboardMenu
        value={{
          text: "My Reviews",
          icon: "fa-solid fa-address-book",
          link: "my-reviews",
        }}
      />
       <DashboardMenu
        value={{
          text: "My Profile",
          icon: "fa-regular fa-address-card",
          link: "my-profile",
        }}
      />
  </>

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

          {/* User Access */}
          <ul className="w-60 bg-base-100 text-base-content">
            {/* Active user */}
            <ActiveUser />

            {!isAdmin ?  userAccess :  adminAccess}

          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
