import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import useAlert from "./../../../../../hooks/useAlert";
import InputBox from "../../../../shared/InputBox/InputBox";
import SelectOption from "../../../../shared/SelectOption/SelectOption";

const AddNewProduct = () => {
  const [user, loading] = useAuthState(auth);

  const handleAddProductInfo = (event) => {
    event.preventDefault();
    const t = event.target;

    console.log(t.hello);
  };

  return (
    <section className="relative">
      {/* Page title */}
      <h2 className="dashboard-title flex-1 uppercase mb-5">
        <i className="fa-solid fa-square-plus mr-2"></i>
        Add a new product
      </h2>

      <form onSubmit={handleAddProductInfo} className="mt-8">
        {/* Upload button */}
        <button
          className="bg-[#5A76FD] p-2 rounded absolute top-0 right-0 text-white"
          type="submit"
        >
          <i className="fa-solid fa-cloud-arrow-up text-xl mr-2 text-white"></i>
          Upload
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
          <div className="col-span-5 rounded p-3 bg-gray-100 flex flex-col justify-between">
            <div>
              {/* Thumbnail */}
              <InputBox
                value={{
                  label: "Thumbnail",
                  name: "title",
                  placeholder: "Enter The URL https://www",
                  required: true,
                  type: "url",
                }}
              />
            </div>

            <div className="relative">
              <input
                type="url"
                placeholder="Enter The URL https://www"
                className=" border border-[#5A76FD] px-3 py-2 w-full rounded-full outline-none"
              />
              <button
                className="bg-[#5A76FD] p-2 rounded-full absolute top-0 right-0 border border-[#5A76FD] text-white"
                type="button"
              >
                Gallery IMG
              </button>
            </div>
          </div>

          <div className="col-span-7 bg-gray-100 rounded p-3">
            <InputBox
              value={{
                label: "Product title",
                name: "title",
                placeholder: "Enter The Product Title",
                required: true,
              }}
            />

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "brand",
                  label: "Brand name",
                  placeholder: "Enter The Brand Name",
                }}
              />

              <InputBox
                value={{
                  name: "price",
                  placeholder: "Enter The Product Price",
                  label: "Price",
                  type: "number",
                  required: true,
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "available",
                  label: "Available Quantity",
                  placeholder: "Enter The Available Quantity",
                  required: true,
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "discount",
                  placeholder: "Enter The Discount Amount",
                  label: "Discount Amount",
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "deliveryCharge",
                  label: "Delivery Charge",
                  placeholder: "Enter The Delivery Charge",
                  required: true,
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "deliveryTime",
                  placeholder: "Enter The Daily Time",
                  label: "Delivery Time",
                  required: true,
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "size",
                  label: "Size",
                  placeholder: "M, L, XL, XXL",
                  required: true,
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "deliveryTime",
                  placeholder: "Enter The Daily Time",
                  label: "Delivery Time",
                  required: true,
                }}
              />
            </div>

            <div className="flex items-center space-x-3">
              <InputBox
                value={{
                  name: "couponCode",
                  label: "Coupon code",
                  placeholder: "AR50",
                  type: "number",
                }}
              />

              <InputBox
                value={{
                  name: "CouponAmount",
                  placeholder: "$50",
                  label: "Coupon Amount",
                }}
              />
            </div>
          </div>
        </div>

        {/* Select & option */}
        <div className="bg-gray-100 p-3 rounded flex flex-col lg:flex-row justify-between items-center mt-3">
          <SelectOption
            value={{
              title: "Type",
              options: [
                { value: true, text: "Popular Product" },
                { value: false, text: "Regular Product" },
              ],
            }}
          />
          <SelectOption
            value={{
              title: "Cash on delivery",
              options: [
                { value: true, text: "Available" },
                { value: false, text: "Not Available" },
              ],
            }}
          />
          <SelectOption
            value={{
              title: "Coupon",
              options: [
                { value: true, text: "Available" },
                { value: false, text: "Not Available" },
              ],
            }}
          />

          <SelectOption
            value={{
              title: "Category",
              styles : 'disabled',
              options: [
                { value: true, text: "Available" },
                { value: false, text: "Not Available" },
              ],
            }}
          />
        </div>

        {/* Description */}
        <div className="mt-3 rounded flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
          <div className="bg-gray-100 p-3 flex-1 rounded">
            <label htmlFor="list" className="text-gray-400 text-lg">
              Attribute List
            </label>
            <textarea
              name=""
              className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
              placeholder="High Quality T-shirt, Stylish Design,  Material: Cotton"
              id="list"
            ></textarea>
          </div>

          <div className="bg-gray-100 p-3 flex-1 rounded">
            <label htmlFor="description" className="text-gray-400 text-lg">
              Description
            </label>
            <textarea
              name=""
              id="description"
              className=" min-w-full min-h-[250px] rounded p-3 outline-none border border-black"
              placeholder="Write something about the product."
            ></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNewProduct;
