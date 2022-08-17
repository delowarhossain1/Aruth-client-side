import React from "react";

const Orders = () => {
  return (
    <section className="">
      <h2 className="dashboard-title">Orders</h2>

      <div>
        <div class="overflow-x-auto">
          <table class="table w-full">

            <thead>
              <tr>
                <th># No.</th>
                <th>IMG</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Orders;
