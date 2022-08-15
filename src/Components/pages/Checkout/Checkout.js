import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../shared/Loading/Loading";
import CheckoutProductCart from "./CheckoutProductCart";

const Checkout = ({ checkoutInfo }) => {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  //   calculate total quantity & price
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let item of checkoutInfo) {
    console.log(item);
    totalPrice += item.total;
    totalQuantity += item.quantity;
  }

  //   If loading
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 space-y-10 lg:space-y-0">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <h4 className="mb-3 text-lg font-semibold">Shipping details</h4>

          {/* Name ----------- */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <input
              type="text"
              placeholder="Enter your password"
              className="input-box w-full border-gray-400 bg-gray-200 cursor-not-allowed"
              value={user?.displayName}
              disabled
            />
          </div>

          {/* Email ----------- */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="text"
              placeholder="Enter your password"
              className="input-box w-full border-gray-400 bg-gray-200 cursor-not-allowed"
              value={user?.email}
              disabled
            />
          </div>

          {/* Phone number ----------- */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Mobile No. *</span>
            </label>

            <input
              type="number"
              placeholder="Enter your mobile number"
              className="input-box w-full border-gray-400"
              min={0}
              {...register("mob", {
                required: {
                  value: true,
                  message: "Mobile number is required",
                },
              })}
            />

            {errors?.mob && (
              <label className="label">
                <span className="label-text-alt">{errors?.mob?.message}</span>
              </label>
            )}
          </div>

          {/* Zip code ----------- */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Zip code</span>
            </label>

            <input
              type="text"
              placeholder="Enter your zip code"
              className="input-box w-full border-gray-400"
              {...register("zipCode")}
            />

            {errors?.zipCode && (
              <label className="label">
                <span className="label-text-alt hidden">
                  {errors?.zipCode?.message}
                </span>
              </label>
            )}
          </div>

          {/* Address ----------- */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Address *</span>
            </label>

            <textarea
              placeholder="Enter your shipping address"
              className="outline-0 border border-gray-400 rounded p-2 min-w-full max-w-full max-h-28 min-h-12"
              {...register("address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
              })}
            ></textarea>

            {errors?.address && (
              <label className="label">
                <span className="label-text-alt">
                  {errors?.address?.message}
                </span>
              </label>
            )}
          </div>

          <button
            className={`w-full bg-orange-500 p-2 text-white text-lg rounded mt-5 ${
              checkoutInfo.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } `}
            disabled={checkoutInfo.length === 0}
          >
            Proceed to Pay
          </button>
        </form>

        {/* ------------------------  Checkout product display ------------ */}

        <div className="flex-1">
          <div>
            {checkoutInfo?.map((item, index) => (
              <CheckoutProductCart key={Math.random * index} item={item} />
            ))}
          </div>

          <div className="mt-10 bg-gray-200 p-2 rounded shadow-md">
            <h3 className="text-lg mb-1">Quantity : {totalQuantity}</h3>
            <h3 className="text-lg mb-1">Total : ${totalPrice}</h3>
            <h5 className="text-xs">( Shipping fee & discount included )</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
