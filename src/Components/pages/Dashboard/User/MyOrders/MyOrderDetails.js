import React, { useEffect } from "react";
import { useState } from "react";
import DashboardTitle from "../../DashboardTitle";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import { useParams } from "react-router-dom";
import Taka from "../../../../shared/Taka/Taka";
import Loading from "../../../../shared/Loading/Loading";
import useAlert from "./../../../../../hooks/useAlert";
const defaultProfileImg = "https://i.ibb.co/10JxYVW/user.png";

const MyOrderDetails = () => {
  const { id } = useParams();
  const { successfulAlertWithAutoClose } = useAlert();
  const [user, loading] = useAuthState(auth);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [makeIcon, setMakeIcon] = useState("");
  const [ratingCount, setRatingCount] = useState(2);
  const [oldReview, setOldReview] = useState({});
  const [newReviewText, setNewReviewText] = useState("");

  const {
    address,
    customer,
    date,
    email,
    mob,
    orderNum,
    productImg,
    productName,
    productQuantity,
    size,
    status,
    total,
    productId,
  } = orderDetails;

  useEffect(() => {
    const url = `http://localhost:5000/my-order-details/${id}?email=${user?.email}`;
    fetch(url, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOrderDetails(res);
        setOrderLoading(false);
      });
  }, [user, id]);

  // get previous review
  useEffect(() => {
    if (orderNum) {
      const url = `http://localhost:5000/get-review-by-order-number/${orderNum}?email=${user?.email}`;

      fetch(url, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setOldReview(res);
        });
    }
  }, [orderNum, user]);

  // make product status icon
  useEffect(() => {
    if (status?.toLowerCase() === "pending") {
      setMakeIcon(<i class="fa-solid fa-spinner mr-2"></i>);
    } else if (status?.toLowerCase() === "shipped") {
      setMakeIcon(<i class="fa-solid fa-truck-fast"></i>);
    } else if (status?.toLowerCase() === "delivered") {
      setMakeIcon(<i class="fa-solid fa-check"></i>);
    } else if (status?.toLowerCase() === "cancel") {
      setMakeIcon(<i class="fa-solid fa-face-sad-tear"></i>);
    }
  }, [status, orderDetails]);

  // Handle ratings
  const handleRatings = (event) => {
    event.preventDefault();

    const ratingInfo = {
      img: user?.photoURL || defaultProfileImg,
      productId,
      orderNum,
      email,
      name: user?.displayName,
      ratings: ratingCount,
      text: event.target.comment.value,
    };

    const url = `http://localhost:5000/add-review/${orderNum}?email=${user?.email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(ratingInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.upsertedCount || res?.modifiedCount) {
          successfulAlertWithAutoClose("Your review has been published.");
        }
      });
  };

  useEffect(() => {
    const { text, ratings } = oldReview;

    setNewReviewText(text || "");
    setRatingCount(ratings || 2);
  }, [oldReview]);

  const handleReviewTextBox = (e) => {
    setNewReviewText(e.target.value);
  };

  if (loading || orderLoading) {
    return <Loading />;
  }

  return (
    <section>
      <DashboardTitle
        value={{ text: "Order Details", icon: "fa-solid fa-bag-shopping" }}
      />

      <div className="bg-gray-50 p-2 rounded mt-5">
        <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-2">
          <div>
            <h4>Order #{orderNum}</h4>
            <h4 className="text-xs">Placed on {date}</h4>
          </div>
          <h4 className="text-lg flex items-center">
            <span className="text-gray-500 mr-2">Total : </span>
            <Taka className="w-4" />
            {total}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-5  items-center justify-between">
          <div className="flex col-span-6">
            <img src={productImg} alt="product" className="w-20 mr-3" />
            <h2>
              {productName?.length > 70
                ? productName?.slice(0, 70) + "...."
                : productName}
            </h2>
          </div>
          <div className="col-span-2">
            <h4>Qty : {productQuantity}</h4>
            <h4>Size : {size}</h4>
          </div>

          <div className="col-span-2 flex justify-center">
            <h4
              className={`py-1 px-3 rounded text-white italic ${
                status?.toLowerCase() === "cancel"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {makeIcon} {status}
            </h4>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row space-x-0 space-y-5 lg:space-x-5 lg:space-y-0 mt-5">
        <div className="flex-1">
          <div className="bg-gray-50 p-3 rounded mb-5">
            <h3 className="text-lg mb-2">Shipping Address</h3>
            <h4>Name : {customer}</h4>
            <h4>Mobile : {mob}</h4>
            <p>Address : {address}</p>
          </div>

          {/* Comment =========== */}
          {status === "Delivered" && (
            <div className="bg-gray-50 p-3 rounded flex justify-center flex-col items-center">

              <img
                src={user?.photoURL || defaultProfileImg}
                alt="profile img"
                className=" w-20 h-20 rounded-full"
              />

              {/* give ratings */}
              <div className="flex items-center">
                <div class="rating mt-3">
                  <input
                    onClick={() => setRatingCount(1)}
                    type="radio"
                    name="rating-4"
                    class="mask mask-star-2 bg-yellow-300"
                    checked={ratingCount === 1}
                  />
                  <input
                    onClick={() => setRatingCount(2)}
                    type="radio"
                    name="rating-4"
                    class="mask mask-star-2 bg-yellow-300"
                    checked={ratingCount === 2}
                  />
                  <input
                    onClick={() => setRatingCount(3)}
                    type="radio"
                    name="rating-4"
                    class="mask mask-star-2 bg-yellow-300"
                    checked={ratingCount === 3}
                  />
                  <input
                    onClick={() => setRatingCount(4)}
                    type="radio"
                    name="rating-4"
                    class="mask mask-star-2 bg-yellow-300"
                    checked={ratingCount === 4}
                  />
                  <input
                    onClick={() => setRatingCount(5)}
                    type="radio"
                    name="rating-4"
                    class="mask mask-star-2 bg-yellow-300"
                    checked={ratingCount === 5}
                  />
                </div>

                <span className="mt-3 ml-2">( {ratingCount} star )</span>
              </div>

              <h5 className="text-xs mt-2">
                Please double click on the star to add the ratings
              </h5>

              <form
                className="mt-3 w-full text-center"
                onSubmit={handleRatings}
              >
                <textarea
                  value={newReviewText}
                  onChange={handleReviewTextBox}
                  name="comment"
                  placeholder="Your comment here"
                  className="min-w-full min-h-[120px] p-2 rounded border border-gray-300 outline-none"
                  autoFocus
                  required
                ></textarea>

                <button
                  type="submit"
                  className=" w-40 bg-yellow-400 p-2 rounded text-white mt-3"
                >
                  Add Review
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="flex-1 bg-gray-50 rounded p-3">
          <h3 className="text-lg mb-2">Summary</h3>
          <h4 className="flex items-center text-lg">
            Total : <Taka className="w-4 ml-2" />
            {total}
          </h4>
          <h4 className="text-xs">( Shipping fee & others are included )</h4>
        </div>
      </div>
    </section>
  );
};

export default MyOrderDetails;
