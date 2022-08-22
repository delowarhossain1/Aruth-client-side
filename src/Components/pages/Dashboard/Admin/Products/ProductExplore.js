import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import Loading from "../../../../shared/Loading/Loading";

const ProductExplore = () => {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const [isWantToEdit, setIsWantToEdit] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const URL = `http://localhost:5000/product-explore/${id}?email=${user?.email}`;

    fetch(URL, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, user]);

  const {
    img,
    name,
    ratings,
    price,
    discount,
    brand,
    popular,
    size,
    availableQuantity,
    totalSells,
    categories,
    deliveryWithin,
    cashOnDelivery,
    couponCode,
    description,
    comments,
  } = product;

// update product description
  const updateProductDescription = event => {
      const updatedText = event.target.value;
      const {description, ...rest} = product;
      const newDocument = {description : {text : updatedText}, ...rest};
      setProduct(newDocument);
  }

  // update product attribute list
  const updateProductAttributeList = event => {
    const updatedText = event.target.value;
    const transformToArray = updatedText.split(',') 
    const {description, ...rest} = product;
    const newAttributes = {description : {list : transformToArray}, ...rest};
    setProduct(newAttributes);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <form>
      <div className="text-right">
        {isWantToEdit && (
          <button
            className="bg-[#005aed] text-white rounded p-2"
            onClick={() => setIsWantToEdit(!isWantToEdit)}
            type="button"
          >
            <i class="fa-solid fa-pen-to-square mr-2"></i>
            Edit
          </button>
        )}

        {!isWantToEdit && (
          <button
            className="bg-[#fb5200] text-white rounded p-2 mr-2"
            onClick={() => setIsWantToEdit(!isWantToEdit)}
            type="button"
          >
            <i class="fa-solid fa-xmark mr-2"></i>
            Cancel
          </button>
        )}

        {!isWantToEdit && (
          <button className="bg-[#005aed] text-white rounded p-2" type="submit">
            <i class="fa-solid fa-file-word mr-2"></i>
            Update
          </button>
        )}
      </div>

      {/* update title ================ */}
      <div className="bg-gray-100 p-2 rounded my-3">
        <h2 className="text-md text-gray-500 mb-2">Title</h2>
        <h3 className="text-xl text-gray-500 mb-2">
          Product Details of - {name}
        </h3>

        <input
          type="text"
          placeholder="Change title..."
          class="input input-bordered border-black input-sm w-full max-w-md"
          disabled={isWantToEdit}
        />
      </div>

      <div className="bg-gray-100 p-2 rounded mb-3">
        {/* update image ================ */}
        <h2 className="text-md text-gray-500 mb-3">Product</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <img src={img} alt="product" className="w-48" />

            <input
              type="text"
              placeholder="Change image url..."
              class="input input-bordered border-black input-sm w-full max-w-xs mt-2"
              disabled={isWantToEdit}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <div>
                {/* update Price ================ */}
                <h2 className="text-xl text-center">Price</h2>
                <h3 className="text-center text-md text-gray-400">${price}</h3>

                <input
                  type="text"
                  placeholder="Change price"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled={isWantToEdit}
                />
              </div>

              <div>
                {/* update quantity ================ */}
                <h2 className="text-xl text-center">Available</h2>
                <h2 className="text-md text-center text-gray-400">
                  {availableQuantity} piece
                </h2>

                <input
                  type="text"
                  placeholder="Change Quantity"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled={isWantToEdit}
                />
              </div>

              <div>
                {/* update delivery date ================ */}
                <h2 className="text-xl text-center">Total sells</h2>
                <h2 className="text-md text-center text-gray-400">
                  {totalSells} piece
                </h2>

                <input
                  type="text"
                  placeholder="Change price"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                {/* update delivery date ================ */}
                <h2 className="text-xl text-center">Delivery within</h2>
                <h2 className="text-md text-center text-gray-400">
                  {deliveryWithin?.days} days
                </h2>

                <input
                  type="text"
                  placeholder="Change price"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled={isWantToEdit}
                />
              </div>

              <div>
                {/* update delivery charge ================ */}
                <h2 className="text-xl text-center">Delivery charge</h2>
                <h2 className="text-md text-center text-gray-400">
                  ${deliveryWithin?.charge}
                </h2>

                <input
                  type="text"
                  placeholder="Change price"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled={isWantToEdit}
                />
              </div>

              <div>
                {/* update delivery date ================ */}
                <h2 className="text-xl text-center">Size</h2>
                <h2 className="text-md text-center text-gray-400">
                  {size?.map((s) => s + " ")}
                </h2>

                <input
                  type="text"
                  placeholder="Change price"
                  class="input input-bordered border-black input-sm w-32 mt-2"
                  disabled={isWantToEdit}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div>
                {/* update product type ================ */}
                <h2 className="text-xl text-center">Type</h2>
                <h2 className="text-md text-center text-gray-400">
                  {popular ? "Popular" : "Regular"}
                </h2>

                <select
                  class="select select-bordered mt-2 border-black select-sm w-full max-w-xs"
                  disabled={isWantToEdit}
                >
                  <option value="false">Regular</option>
                  <option value="true">Popular</option>
                </select>
              </div>

              <div>
                {/* update cash on delivery ================ */}
                <h2 className="text-xl text-center">Cash on Delivery</h2>
                <h3 className="text-md text-center text-gray-400">
                  {cashOnDelivery ? "Available" : "Not Available"}
                </h3>

                <select
                  class="select select-bordered mt-2 border-black select-sm w-full max-w-xs"
                  disabled={isWantToEdit}
                >
                  <option value="false">Not Available</option>
                  <option value="true">Available</option>
                </select>
              </div>

              <div>
                {/* update cash on delivery ================ */}
                <h2 className="text-xl text-center">Category</h2>
                <h3 className="text-md text-center text-gray-400">
                  {cashOnDelivery ? "Available" : "Not Available"}
                </h3>
                <select
                  class="select select-bordered mt-2 border-black select-sm w-full max-w-xs"
                  disabled={isWantToEdit}
                >
                  <option value="false">Not Available</option>
                  <option value="true">Available</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-2 rounded mb-3">
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            {/* update discount ================ */}
            <h2 className="text-xl text-center">Discount</h2>
            <h3 className="text-center text-md text-gray-400">${discount}</h3>

            <input
              type="text"
              placeholder="Change discount"
              class="input input-bordered border-black input-sm w-32 mt-2"
              disabled={isWantToEdit}
            />
          </div>

          <div>
            {/* update discount ================ */}
            <h2 className="text-xl text-center">Brand name</h2>
            <h3 className="text-center text-md text-gray-400">{brand}</h3>

            <input
              type="text"
              placeholder="Change brand name"
              class="input input-bordered border-black input-sm w-32 mt-2"
              disabled={isWantToEdit}
            />
          </div>

          <div>
            {/* update coupon code ================ */}
            <h2 className="text-xl text-center">Coupon code</h2>
            <h3 className="text-center text-md text-gray-400">
              {couponCode?.code ? couponCode?.code : 'Not available'}
            </h3>

            <input
              type="text"
              placeholder="Change code"
              class="input input-bordered border-black input-sm w-32 mt-2"
              disabled={isWantToEdit}
            />
          </div>

          <div>
            {/* update coupon amount ================ */}
            <h2 className="text-xl text-center">Coupon amount</h2>
            <h3 className="text-center text-md text-gray-400">
              {couponCode?.amount ? '$'+couponCode?.amount : 'Not available'}
            </h3>

            <input
              type="text"
              placeholder="Change amount"
              class="input input-bordered border-black input-sm w-32 mt-2"
              disabled={isWantToEdit}
            />
          </div>

          <div>
            {/* update ratings ================ */}
            <h2 className="text-xl text-center">Ratings</h2>
            <h3 className="text-center text-md text-gray-400">{ratings}</h3>

            <input
              type="text"
              placeholder="Change ratings"
              class="input input-bordered border-black input-sm w-32 mt-2"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-2 rounded mg-3 flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
        <div className="flex-1">
          <h5 className="mb-2 text-gray-400">List</h5>
          <textarea
            name="list"
            onChange={updateProductAttributeList}
            value={description?.list}
            disabled={isWantToEdit}
            className="w-full min-w-full min-h-[200px] rounded border border-black outline-none p-3"
            placeholder="Enter a list like - The best area, The best city,"
          ></textarea>
        </div>

        <div className="flex-1">
          <h5 className="mb-2 text-gray-400">Description</h5>
          <textarea
            name="description"
            className="w-full min-w-full min-h-[200px] rounded border border-black outline-none p-3"
            placeholder="Description here..."
            onChange={updateProductDescription}
            value={description?.text}
            disabled={isWantToEdit}
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default ProductExplore;
