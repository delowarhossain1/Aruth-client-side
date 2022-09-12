import React from "react";
import LinkWithLi from "../Link/LinkWithLi";
import { Link } from "react-router-dom";
import shoppingCart from "../../../Images/icon/shopping.png";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const defaultProfileImg = "https://i.ibb.co/10JxYVW/user.png";

  const menu = (
    <>
      <LinkWithLi menu={{ link: "/", text: "Home" }} />
      <LinkWithLi menu={{ link: "/products", text: "Products" }} />
    </>
  );

  return (
    <nav className="bg-gray-100">
      <div className="navbar w-[95%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
              {/* if user is logged in, then login menu will be hidden */}
              {!user && <LinkWithLi menu={{ link: "/login", text: "login" }} />}
            </ul>
          </div>

          <Link to="/" className="text-xl uppercase">
            Aruot
          </Link>
        </div>

        <div className="navbar-end flex items-center">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              {menu}
              {/* if user is logged in, then login menu will be hidden */}

              {!user && <LinkWithLi menu={{ link: "/login", text: "login" }} />}
            </ul>
          </div>

          <div>
            <Link to="/">
              <div className="relative">
                <span className="badge badge-sm indicator-item absolute top-0 left-[12px]">
                  0
                </span>
                <img src={shoppingCart} alt="shopping card" className="w-8" />
              </div>
            </Link>
          </div>

          {user && (
            <div className="ml-2">
              <div className="dropdown dropdown-end ">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 border-2 rounded-full">
                    <img
                      src={user?.photoURL || defaultProfileImg}
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard/my-profile" className="justify-between">
                      <span>
                        <i className="fa-solid fa-user mr-2"></i>
                        Profile
                      </span>
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-reviews">
                      <span>
                        <i className="fa-solid fa-address-book mr-1"></i> My Reviews
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <span>
                        <i className="fa-solid fa-chart-line mr-1"></i> Dashboard
                      </span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={() => signOut(auth)}>
                      <span>
                        <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
