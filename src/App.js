import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home/Home";
import Login from "./Components/pages/LoginAndRegister/Login";
import Footer from "./Components/shared/Footer/Footer";
import Navbar from "./Components/shared/Navbar/Navbar";
import Loading from './Components/shared/Loading/Loading';
import ProductDetails from './Components/pages/ProductDetails/ProductDetails';
import Register from './Components/pages/LoginAndRegister/Register';
import Dashboard from "./Components/pages/Dashboard/Dashboard";
import Report from "./Components/pages/Dashboard/Report/Report";
import RequireAuth from "./Components/shared/RequireAuth/RequireAuth";
import Checkout from "./Components/pages/Checkout/Checkout";
import { useState } from "react";
import ProceedToPay from "./Components/pages/Checkout/ProceedToPay";

function App() {
  // proceed to pay (info)
  const [checkoutInfo, setCheckoutInfo] = useState([]);

  // proceed to pay info handle
  const handleCheckoutInfo = (info) => {
    setCheckoutInfo(info);
  }
  // 

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
          <div className="w-[95%] mx-auto">
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/products' element={<Loading />} />
                <Route path='/product-details/:id' element={<ProductDetails handleCheckoutInfo={handleCheckoutInfo} />} />

                {/* Required authentication */}
                <Route path='/checkout' element={<RequireAuth>
                    <Checkout checkoutInfo={checkoutInfo} proceedToPayInfo={handleCheckoutInfo}/>
                </RequireAuth>} />

                <Route path='/payment' element={<RequireAuth>
                    <ProceedToPay/>
                </RequireAuth>} />

                {/* Dashboard routes */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Report />} />
                </Route>


            </Routes>
          </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
