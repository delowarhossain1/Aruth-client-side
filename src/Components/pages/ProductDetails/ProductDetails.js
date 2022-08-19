import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RatingsStar from "../../shared/Ratings/RatingsStar";
import CommentCart from "./CommentCart";
import useAlert from "./../../../hooks/useAlert";

const ProductDetails = ({ handleCheckoutInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { successfulAlertWithAutoClose } = useAlert();
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponBtnDisabled, setCouponBtnDisabled] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/product-details/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const {
    img,
    name,
    ratings,
    price,
    discount,
    brand,
    size,
    availableQuantity,
    description,
    comments,
    deliveryWithin,
    cashOnDelivery,
    couponCode,
  } = product;

  // update product quantity
  const updateProductQuantity = (btn) => {
    if (btn === "plus" && productQuantity < availableQuantity) {
      setProductQuantity(productQuantity + 1);
    } else if (btn === "minus") {
      if (productQuantity > 1) {
        setProductQuantity(productQuantity - 1);
      }
    }
  };

  // Handle coupon code ------------
  const handleCouponCode = (event) => {
    event.preventDefault();
    const code = event.target.couponCode.value;

    if (couponCode) {
      // Checking coupon code
      if (couponCode?.code === code) {
        setCouponAmount(couponCode?.amount);
        // successful alert
        successfulAlertWithAutoClose(
          `Congratulation, You got $${couponCode?.amount} discount.`
        );
        // disable coupon code button
        setCouponBtnDisabled(true);
      } else {
        setCouponAmount(0);
        // error message
        successfulAlertWithAutoClose("The coupon code is not valid.", "error");
      }
    } else {
      successfulAlertWithAutoClose(
        "Coupon code is not available for this product.",
        "error"
      );
      setCouponBtnDisabled(true);
    }
  };

  // Calculate the product price;
  const deliveryCharge = parseInt(deliveryWithin?.charge);
  const productPrice = price;
  const quantity = productQuantity;
  const shippingCharge = deliveryCharge * quantity || 0;
  const subTotalPrice = quantity * productPrice || 0;
  const subTotal = shippingCharge + subTotalPrice;
  const couponDiscount = quantity * couponAmount;
  const total = subTotal - couponDiscount;

  // final data for (proceed to pay);
  const sentDataToCheckout = (btn) => {
    // send data to (proceed to pay).
    handleCheckoutInfo(
      {
        img,
        name,
        quantity,
        total,
        cashOnDelivery,
        size : selectedSize || 'Empty'
      },
    );

    if(btn === 'buyNow'){
      navigate('/checkout');
    }
    else if(btn === 'addToCart'){
      navigate('/addToCart');
    }
  };

  return (
    <section>
      <div className="py-5 flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white w-full md:w-8/12 rounded p-2">
          <div>
            <img src={img} alt="product" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <RatingsStar star={ratings} />
            <h2 className="my-3 text-5xl text-orange-500">${price}</h2>
            <h4 className="mt-2">Brand : {brand}</h4>
            <h4 className="mt-2">Available : {availableQuantity} pice</h4>

            {/* Product size ------------------- */}
            <div className="flex items-center mt-3">
              <span className="mr-3 font-semibold text-lg">Size</span>
              {size?.map((s, i) => (
                <span
                  key={i * Math.random()}
                  className=" w-8 border border-orange-500 rounded flex justify-center items-center cursor-pointer mr-3"
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Update product order quantity -----------*/}

            <div className="mt-5 flex items-center">
              <span className="mr-5">Quantity </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateProductQuantity("minus")}
                  disabled={productQuantity === 1}
                >
                  <i className="fa-solid fa-minus text-xl cursor-pointer"></i>
                </button>
                <span className="text-xl p-2">{productQuantity}</span>
                <button onClick={() => updateProductQuantity("plus")}>
                  <i className="fa-solid fa-plus text-xl cursor-pointer"></i>
                </button>
              </div>
            </div>
                {/* -----------  Add to cart & buy now button -------- */}
            <div className=" flex items-center space-x-5 mt-5">
              <button
                className="py-2 px-4 bg-blue-500 rounded text-white"
                onClick={()=> sentDataToCheckout('addToCart')}
              >
                <i className="fa-solid fa-cart-plus mr-2"></i>
                Add to Cart
              </button>

              <button
                className="py-2 px-4 bg-orange-500 rounded text-white"
                onClick={()=> sentDataToCheckout('buyNow')}
              >
                <i className="fa-solid fa-bag-shopping mr-2"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Orders summery ======================*/}

        <div className="w-full md:w-4/12 p-3 bg-white shadow-md rounded">
          <h4 className="text-xl mb-3 text-center">Summery</h4>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <i className="fa-solid fa-truck text-gray-500"></i>
              <div className="flex flex-col ml-5">
                <span>Standard Delivery</span>
                <span className="text-sm text-gray-500">
                  {deliveryWithin?.days} day(s)
                </span>
              </div>
            </div>

            <h4 className="text-lg text-orange-500">
              ${deliveryWithin?.charge}
            </h4>
          </div>

          <div className="flex items-center mb-3">
            <i className="fa-solid fa-money-bill-wave text-gray-500"></i>
            <div className="flex flex-col ml-5">
              <span>Cash on Delivery </span>
              <span className="text-sm text-gray-500">{cashOnDelivery ? 'Available' : 'Not Available'}</span>
            </div>
          </div>

          <div className="flex items-center">
            <i className="fa-solid fa-shield text-gray-500"></i>
            <h2 className="ml-5">Warranty not available</h2>
          </div>

          <div className="border-t my-3 border-gray-200"></div>

          <div>
            {size && (
              <h2 className="mb-1 text-md font-bold">
                Size : {selectedSize || size[0]}
              </h2>
            )}
            <h2 className="mb-1 text-md">Price : ${price}</h2>
            <h2 className="mb-1 text-md">Quantity : {quantity} pice</h2>
            <h2 className="mb-1 text-md">Shipping : ${shippingCharge}</h2>
            <h2 className="mb-1 text-md">Sub Total : ${subTotal}</h2>
            <h2 className="mb-1 text-md">Discount : ${couponDiscount}</h2>
            <h2 className="mb-1 text-md">Total : ${total}</h2>
          </div>

          {/* Coupon code */}
          <form className="mt-4 relative" onSubmit={handleCouponCode}>
            <input
              type="text"
              name="couponCode"
              placeholder="COUPON CODE"
              className="w-full border-2 p-2 border-gray-200 outline-0 rounded-full"
            />

            <button
              className={`w-28 bg-orange-500 text-white p-2 absolute top-0 right-0 uppercase border-2 border-orange-500 rounded-full hover:bg-orange-400 duration-200 ${
                couponBtnDisabled && " cursor-not-allowed"
              }`}
              disabled={couponBtnDisabled}
            >
              <i className="fa-solid fa-gift mr-2"></i>
              Get off
            </button>
          </form>
        </div>
      </div>

      {/* Product description & ratings ========================*/}

      <div className="bg-white p-3 mb-5">
        <h2 className="text-2xl mb-2">{name}</h2>

        <ul className="text-sm font-semibold list-disc ml-5 mb-5">
          {description?.list?.map((l, i) => (
            <li key={i * Math.random()}> {l}</li>
          ))}
        </ul>

        <p className="text-sm">{description?.text}</p>
      </div>

      <div className="p-3 bg-white">
        <h2 className="lg:text-xl">Ratings & Reviews of {name}</h2>

        <div className="mb-10">
          <h3 className="text-2xl lg:text-5xl text-orange-500 my-3">
            {ratings}
            <span className="text-xl text-gray-500">/5</span>
          </h3>

          <RatingsStar star={ratings} styles="text-xl lg:text-2xl" />

          <h4 className="text-sm text-gray-500">{comments?.length} Ratings</h4>
        </div>

        <div>
          {comments?.map((comment, index) => (
            <CommentCart key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
