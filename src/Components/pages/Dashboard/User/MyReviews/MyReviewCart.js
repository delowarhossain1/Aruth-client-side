import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import useAlert from "../../../../../hooks/useAlert";
import Loading from "../../../../shared/Loading/Loading";
import RatingsStar from "../../../../shared/Ratings/RatingsStar";
import { useNavigate } from "react-router-dom";

const MyReviewCart = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const { productImg, ratings, text, productName, orderId, _id } = review;
  const { deleteModal } = useAlert();

  const handleReviewDelete = () => {
    deleteModal(() => {
      const URL = `http://localhost:5000/delete-my-review?id=${_id}&email=${user?.email}`;

      fetch(URL, {
        method: "DELETE",
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.deletedCount) {
            refetch();
          }
        });
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-50 p-2 rounded shadow mb-4">
      <div className="flex justify-end mb-3">
        <button
          className="bg-red-400 p-2 rounded text-white shadow mr-5"
          onClick={handleReviewDelete}
        >
          <i class="fa-solid fa-trash-can mr-1"></i>Delete
        </button>

        <button
          className="bg-green-400 p-2 rounded text-white shadow"
          onClick={() => navigate(`/dashboard/my-order-details/${orderId}`)}
        >
          <i class="fa-solid fa-pen mr-1"></i> Edit
        </button>
      </div>

      <div className="flex flex-col lg:flex-row space-x-0 space-y-5 lg:space-x-5 lg:space-y-0">
        <div>
          <img src={productImg} alt="user" className=" w-20 h-20 rounded" />

          <p className="mt-3">
            <RatingsStar star={ratings} />
          </p>

          <div></div>
        </div>

        <div className="mt-3 text-md">
          <h4 className="mb-2 font-semibold text-lg">
            {productName?.length > 70 ? productName.slice(0, 70) : productName}
          </h4>

          <p>{text?.length > 150 ? text.slice(0, 150) : text}</p>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCart;
