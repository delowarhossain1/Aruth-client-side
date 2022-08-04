import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home/Home";
import Login from "./Components/pages/LoginAndRegister/Login";
import Footer from "./Components/shared/Footer/Footer";
import Navbar from "./Components/shared/Navbar/Navbar";
import Loading from './Components/shared/Loading/Loading';
import ProductDetails from './Components/pages/ProductDetails/ProductDetails';
import Register from './Components/pages/LoginAndRegister/Register';

function App() {
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
                <Route path='/product-details/:id' element={<ProductDetails />} />

            </Routes>
          </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
