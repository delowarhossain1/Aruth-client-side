import React from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./../../../../shared/InputBox/InputBox";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import useAlert from "./../../../../../hooks/useAlert";
import { useState } from "react";
import Loading from "../../../../shared/Loading/Loading";

const AddNewCategory = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [uploading, setUploading] = useState(false);
  const { successToast } = useAlert();

  if(loading || uploading){
    return <Loading />
  }

  const handleCategoryInfo = (event) => {
    event.preventDefault();
    setUploading(true);

    const t = event.target;
    const img = t.img.value;
    const text = t.text.value;

    const category = {
      img,
      text,
      link: `/category/${text}`
    };

    // store in db
    const URL = `http://localhost:5000/create-category?email=${user?.email}`;

    fetch(URL, {
      method: "POSt",
      headers: {
        "content-type": "application/json",
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((res) => {
        setUploading(false);

        if(res?.insertedId){
            successToast("The category has been added.");
            navigate('/dashboard/categories/');
        }
      });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* Section title */}
        <h2 className="dashboard-title">
          <i className="fa-solid fa-dolly mr-2"></i> Add A New Categories
        </h2>

        <button
          className="bg-[#fb5200] p-2 rounded text-white"
          onClick={() => navigate("/dashboard/categories/")}
        >
          <i class="fa-solid fa-xmark mr-2"></i> Cancel
        </button>
      </div>

      <div className="flex items-center justify-center mt-20">
        <form
          className="max-w-xs bg-gray-100 p-4 rounded shadow-lg"
          onSubmit={handleCategoryInfo}
        >
          <h3 className="text-2xl text-center mb-4">
            <i className="fa-solid fa-dolly mr-2"></i> New Category
          </h3>

          <InputBox
            value={{
              required: true,
              label: "Thumbnail URL",
              type: "url",
              placeholder: "https://wwww.",
              name: "img",
            }}
          />

          <InputBox
            value={{
              required: true,
              label: "Category Name",
              type: "text",
              placeholder: "T Shirt",
              name: "text",
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

export default AddNewCategory;
