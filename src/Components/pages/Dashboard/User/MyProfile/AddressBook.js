import React from "react";
import DashboardTitle from "../../DashboardTitle";

const AddressBook = () => {
  return (
    <section>
      <DashboardTitle
        value={{ text: "Address Book", icon: "fa-solid fa-address-book" }}
      />

      <div>
        <div class="overflow-x-auto">
          <table class="table w-full mt-5">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AddressBook;
