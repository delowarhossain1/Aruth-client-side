import React, { useState } from "react";
import Date from "./Date";
import PiChart from "./PiChart";
import ResentProductCart from "./ResentProductCart";

const Report = () => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <div>
      {/* Title & date */}
      <div className="flex justify-between relative">
        <h2 className="dashboard-title">Report</h2>

        <button
          className="p-2 bg-gray-100 rounded"
          onClick={() => setOpenDate(!openDate)}
        >
          <span>12/87/92</span>
          {openDate ? (
            <i className="fa-solid fa-angle-down ml-2"></i>
          ) : (
            <i className="fa-solid fa-angle-up ml-2"></i>
          )}
        </button>

        {openDate && (
          <div className="absolute z-30 top-7 right-0">
            <Date />
          </div>
        )}
      </div>

        {/* Report box */}
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#5a76fd] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">5320+</h2>
            <h5 className="text-white mt-2">Complete Orders</h5>
          </div>
          <div>
            <i className="fa-solid fa-cart-shopping text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#FD4755] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">9320+</h2>
            <h5 className="text-white mt-2">Registered Users</h5>
          </div>
          <div>
            <i className="fa-solid fa-user-check text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#cf8f5b] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">320+</h2>
            <h5 className="text-white mt-2">Products</h5>
          </div>
          <div>
            <i className="fa-solid fa-bag-shopping text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#DCAD00] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">120+</h2>
            <h5 className="text-white mt-2">Pending orders</h5>
          </div>
          <div>
            <i className="fa-solid fa-spinner text-3xl text-white"></i>
          </div>
        </div>
      </div>

      {/* Todays report & calender  */}

      <div className="flex flex-cold justify-evenly lg:flex-row py-5 space-y-5 lg:space-x-5">
        <PiChart />
       
      </div>

      {/* Resent Orders & user */}

      <div className="pt-5">
        <div className="flex flex-col lg:flex-row justify-between space-y-5 space-x-0 lg:space-x-5 lg:space-y-0 ">
          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-2">Resent orders</h2>
            <ResentProductCart />
            <ResentProductCart />
            <ResentProductCart />
            <ResentProductCart />
            <ResentProductCart />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-2">Resent customer</h2>
            <ResentProductCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
