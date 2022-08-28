import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../../firebase.init";
import { useNavigate } from "react-router-dom";
import InputBox from "../../../../shared/InputBox/InputBox";
import Loading from "../../../../shared/Loading/Loading";
import useAlert from '../../../../../hooks/useAlert';

const AddNewSliders = () => {
  const [user, loading] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const {successToast} = useAlert();

  const handleSliderInfo = (event) => {
    event.preventDefault();
    setSubmitting(true);
    const img = event.target.img.value || '';
    const link = event.target.link.value || '/';
    const sliderInfo = { img, link };

    const URL = `http://localhost:5000/insert-slider?email=${user?.email}`;
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(sliderInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false);

        if(res?.insertedId){
            navigate('/dashboard/sliders');
            successToast('The slider has been added.')
        }
      });
  };

  if (loading || submitting) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* Page title */}
        <h2 className="dashboard-title flex-1 uppercase mb-5">
          <i class="fa-solid fa-sliders mr-2"></i>
          Add A New Slider
        </h2>

        {/* Add new button */}
        <button
          className="bg-[#5a76fd] p-2 rounded text-white"
          onClick={() => navigate("/dashboard/sliders")}
        >
          <i class="fa-solid fa-sliders mr-2"></i>
          Cancel
        </button>
      </div>

      <div className="flex items-center justify-center mt-8">
        <form
          className="max-w-xs bg-gray-100 p-4 rounded shadow-lg"
          onSubmit={handleSliderInfo}
        >
          <h3 className="text-2xl text-center mb-4">
            <i class="fa-solid fa-sliders mr-2"></i> New Slider
          </h3>

          <InputBox
            value={{
              required: true,
              label: "Slider IMG URL",
              type: "url",
              placeholder: "https://wwww.",
              name: "img",
            }}
          />

          <InputBox
            value={{
              required: true,
              label: "Path",
              type: "text",
              placeholder: "/t-shirt (space not allow)",
              name: "link",
            }}
          />

          <button className="p-2 bg-[#5a76fd] text-xl w-full rounded text-white mt-3">
            <i class="fa-solid fa-circle-plus mr-2" type="submit"></i>
            Add
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewSliders;
