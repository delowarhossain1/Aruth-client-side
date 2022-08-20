import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../shared/Loading/Loading";
import CheckoutProductCart from "./CheckoutProductCart";
import { useNavigate } from 'react-router-dom';
import useAlert from './../../../hooks/useAlert';

const Checkout = ({ checkoutInfo }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const {simpleAlert} = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const orderSummery = {
      customer : user?.displayName,
      email : user?.email,
      mob : data.mob,
      address : data.address,
      zipCode : data?.zipCode || '0000000',
      productImg : checkoutInfo?.img,
      productName : checkoutInfo?.name,
      productQuantity : checkoutInfo?.quantity,
      status : 'Pending',
      date : new Date().toDateString(),
      paid : true,
      paymentStatue : 'cash',
      transactionId : '00000000abc',
      size : checkoutInfo?.size,
      total : checkoutInfo?.total,
      orderNum : 10000,
    }

    // Place order
    fetch(`http://localhost:5000/place-order?email=${user?.email}`, {
      method : 'POST',
      headers : {
        'content-type' : 'application/json',
        auth : `Bearer ${localStorage.getItem('accessToken')}`
      },
      body : JSON.stringify(orderSummery)
    })
    .then(res => res.json())
    .then(data => {
      // Order success message
        if(data?.insertedId){
          simpleAlert({
            symbol : 'success',
            text : 'Your order has been completed.',
            title : 'Successful'
          });

          navigate('/products')
        }
        else{
          simpleAlert({
            symbol : 'error',
            text : 'Sorry your order was not successful. Try agin',
            title : 'Sorry'
          })
        }
    });
  };


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
              <CheckoutProductCart item={checkoutInfo} />
          </div>

          <div className="mt-10 bg-gray-200 p-2 rounded shadow-md">
            <h2 className="text-xl mb-2">Summary </h2>
            <h3 className="text-md mb-1">Quantity : {checkoutInfo?.quantity}</h3>
            <h3 className="text-md mb-1">Total : ${checkoutInfo?.total}</h3>
            <h5 className="text-xs">( Shipping fee & discount included )</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
