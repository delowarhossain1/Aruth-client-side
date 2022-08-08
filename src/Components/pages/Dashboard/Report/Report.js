import React from "react";
import Date from "./Date";
import LineChartReport from "./LineChart";
import PiChart from "./PiChart";

const Report = () => {
    
    
  return (
    <div>
      <h2 className="dashboard-title">Report</h2>

      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#5a76fd] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">5320+</h2>
            <h5 className="text-white mt-2">Complete Orders</h5>
          </div>
          <div>
            <i class="fa-solid fa-cart-shopping text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#FD4755] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">9320+</h2>
            <h5 className="text-white mt-2">Registered Users</h5>
          </div>
          <div>
            <i class="fa-solid fa-user-check text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#cf8f5b] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">320+</h2>
            <h5 className="text-white mt-2">Products</h5>
          </div>
          <div>
            <i class="fa-solid fa-bag-shopping text-3xl text-white"></i>
          </div>
        </div>

        <div className="bg-[#DCAD00] p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div>
            <h2 className="text-4xl text-white">120+</h2>
            <h5 className="text-white mt-2">Pending orders</h5>
          </div>
          <div>
            <i class="fa-solid fa-spinner text-3xl text-white"></i>
          </div>
        </div>
      </div>

      {/* Todays report & calender  */}

      <div className="flex flex-cold justify-evenly lg:flex-row py-5 space-y-5 lg:space-x-5">

            <Date />
            <PiChart />

      </div>
    </div>
  );
};

export default Report;
