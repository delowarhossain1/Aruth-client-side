import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import Loading from "../../../../shared/Loading/Loading";
import useAlert from "../../../../../hooks/useAlert";
import DashboardTitle from './../../DashboardTitle/DashboardTitle';

const ManageSliders = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const {deleteModal, successfulAlertWithAutoClose} = useAlert();
  const [reloadData, setReloadData] = useState(false);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const URL = `http://localhost:5000/sliders`;

    fetch(URL, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setSliders(res);
        setDataLoading(false);
      });
  }, [user, reloadData]);

  //   Handle slider image delete
  const handleSliderDelete = (id) => {
    const URL = `http://localhost:5000/delete-slider/${id}?email=${user?.email}`;

    deleteModal(() => {
      fetch(URL, {
        method: "DELETE",
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
            if(res?.deletedCount){
                successfulAlertWithAutoClose('The slider has been deleted.');
                setReloadData(!reloadData);
            }
        });
    });
  };

  if (dataLoading || loading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* Page title */}
        <DashboardTitle
            value={{
              text: "Manage Sliders",
              icon: "fa-solid fa-sliders",
            }}
          />

        {/* Add new button */}
        <button
          className="bg-[#5a76fd] p-2 rounded text-white"
          onClick={() => navigate("add-new")}
        >
          <i class="fa-solid fa-sliders mr-2"></i>
          Add New
        </button>
      </div>

      <div className="mt-5">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>#No.</th>
                <th>IMG</th>
                <th>Path</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sliders?.map((slider, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <img src={slider?.img} alt="slider img" className="w-20" />
                  </td>
                  <td>{slider?.link}</td>
                  <td>
                    <button className="bg-[#fb5200] p-2 rounded text-white" onClick={()=> handleSliderDelete(slider?._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageSliders;
