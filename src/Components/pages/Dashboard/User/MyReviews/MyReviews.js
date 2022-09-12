import React from "react";
import DashboardTitle from "../../DashboardTitle";
import MyReviewCart from "./MyReviewCart";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "../../../../shared/Loading/Loading";

const MyReviews = () => {
  const [user, loading] = useAuthState(auth);

  const URL = `http://localhost:5000/my-all-review?email=${user?.email}`;

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery(["my-all-reviews", user], () =>
    fetch(URL).then((res) => res.json())
  );

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <DashboardTitle
        value={{ text: "My Reviews", icon: "fa-solid fa-address-book" }}
      />

      {/* Display all reviews */}

      <div className="mt-5">
        {reviews?.map((review) => (
          <MyReviewCart key={review._id} review={review} refetch={refetch} />
        ))}
      </div>

      {
        reviews?.length === 0 && <div className="text-lg text-gray-500 h-80 flex justify-center items-center">No Reviews..</div>
      }
    </div>
  );
};

export default MyReviews;
