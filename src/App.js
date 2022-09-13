import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home/Home";
import Login from "./Components/pages/LoginAndRegister/Login";
import Footer from "./Components/shared/Footer/Footer";
import Navbar from "./Components/shared/Navbar/Navbar";
import ProductDetails from "./Components/pages/ProductDetails/ProductDetails";
import Register from "./Components/pages/LoginAndRegister/Register";
import Dashboard from "./Components/pages/Dashboard/Dashboard";
import Report from "./Components/pages/Dashboard/Admin/Report/Report";
import RequireAuth from "./Components/shared/Required/RequireAuth";
import Checkout from "./Components/pages/Checkout/Checkout";
import { useState } from "react";
import ProceedToPay from "./Components/pages/Checkout/ProceedToPay";
import GetAllProducts from "./Components/GetAllProducts/GetAllProducts";
import Orders from "./Components/pages/Dashboard/Admin/Orders/Orders";
import RequiredAdmin from "./Components/shared/Required/RequiredAdmin";
import OrderDetails from "./Components/pages/Dashboard/Admin/Orders/OrderDetails";
import Products from "./Components/pages/Dashboard/Admin/Products/Products";
import ProductExplore from "./Components/pages/Dashboard/Admin/Products/ProductExplore";
import { ToastContainer } from "react-toastify";
import AddNewProduct from "./Components/pages/Dashboard/Admin/Products/AddNewProduct";
import ManageCategories from "./Components/pages/Dashboard/Admin/Categories/ManageCategories";
import Admins from "./Components/pages/Dashboard/Admin/Admins/Admins";
import Users from "./Components/pages/Dashboard/Admin/Users/Users";
import AddNewCategory from "./Components/pages/Dashboard/Admin/Categories/AddNewCategory";
import ManageSliders from "./Components/pages/Dashboard/Admin/ManageSliders/ManageSliders";
import AddNewSliders from "./Components/pages/Dashboard/Admin/ManageSliders/AddNewSliders";
import CategoryProduct from "./Components/pages/CategoryProduct/CategoryProduct";
import useAdmin from "./hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import MyOrders from './Components/pages/Dashboard/User/MyOrders/MyOrders';
import MyOrderDetails from "./Components/pages/Dashboard/User/MyOrders/MyOrderDetails";
import MyReviews from "./Components/pages/Dashboard/User/MyReviews/MyReviews";
import MyProfile from './Components/pages/Dashboard/User/MyProfile/MyProfile';
import AddToCard from './Components/pages/AddToCard/AddToCard';
import AllCategories from './Components/pages/Home/Categories/AllCategories';

function App() {
  const [user] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);

  // proceed to pay (info)
  const [checkoutInfo, setCheckoutInfo] = useState([]);

  // proceed to pay info handle
  const handleCheckoutInfo = (info) => {
    setCheckoutInfo(info);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="w-[95%] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<GetAllProducts />} />
            <Route path="/add-to-card" element={<AddToCard />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/category/:id" element={<CategoryProduct />} />
            <Route
              path="/product-details/:id"
              element={
                <ProductDetails handleCheckoutInfo={handleCheckoutInfo} />
              }
            />

            {/********** Required authentication ********/}

            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <Checkout
                    checkoutInfo={checkoutInfo}
                    proceedToPayInfo={handleCheckoutInfo}
                  />
                </RequireAuth>
              }
            />

            <Route
              path="/payment"
              element={
                <RequireAuth>
                  <ProceedToPay />
                </RequireAuth>
              }
            />

            {/********* Dashboard routes ********/}

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              {/* Index route */}
              {!isAdmin ? (
                <Route index element={<MyOrders />} />
              ) : (
                <Route
                  index
                  element={
                    <RequiredAdmin>
                      <Report />
                    </RequiredAdmin>
                  }
                />
              )}

              <Route path="my-order-details/:id" element={<MyOrderDetails />} />
              <Route path="my-reviews" element={<MyReviews />} />
              <Route path="my-profile" element={<MyProfile />} />

            {/* ______________________ Admin routes ___________ */}
              <Route
                path="orders"
                element={
                  <RequiredAdmin>
                    <Orders />
                  </RequiredAdmin>
                }
              />

              <Route
                path="order-details/:id"
                element={
                  <RequiredAdmin>
                    <OrderDetails />
                  </RequiredAdmin>
                }
              />

              <Route
                path="products"
                element={
                  <RequiredAdmin>
                    <Products />
                  </RequiredAdmin>
                }
              />

              <Route
                path="products/explore/:id"
                element={
                  <RequiredAdmin>
                    <ProductExplore />
                  </RequiredAdmin>
                }
              />

              <Route
                path="add-new-product"
                element={
                  <RequiredAdmin>
                    <AddNewProduct />
                  </RequiredAdmin>
                }
              />

              <Route
                path="categories"
                element={
                  <RequiredAdmin>
                    <ManageCategories />
                  </RequiredAdmin>
                }
              />

              <Route
                path="categories/add-new"
                element={
                  <RequiredAdmin>
                    <AddNewCategory />
                  </RequiredAdmin>
                }
              />

              <Route
                path="sliders"
                element={
                  <RequiredAdmin>
                    <ManageSliders />
                  </RequiredAdmin>
                }
              />

              <Route
                path="sliders/add-new"
                element={
                  <RequiredAdmin>
                    <AddNewSliders />
                  </RequiredAdmin>
                }
              />

              <Route
                path="admins"
                element={
                  <RequiredAdmin>
                    <Admins />
                  </RequiredAdmin>
                }
              />

              <Route
                path="users"
                element={
                  <RequiredAdmin>
                    <Users />
                  </RequiredAdmin>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />

      {/* React-Toastify  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
