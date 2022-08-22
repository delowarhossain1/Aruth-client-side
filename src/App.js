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
import { ToastContainer } from 'react-toastify';

function App() {
  // proceed to pay (info)
  const [checkoutInfo, setCheckoutInfo] = useState([]);

  // proceed to pay info handle
  const handleCheckoutInfo = (info) => {
    setCheckoutInfo(info);
  };
  //

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
              <Route
                index
                element={
                  <RequiredAdmin>
                    <Report />
                  </RequiredAdmin>
                }
              />

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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
