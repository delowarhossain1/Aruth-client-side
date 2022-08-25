import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../../../shared/Loading/Loading";
import auth from "./../../../../../firebase.init";
import { useNavigate } from "react-router-dom";
import useAlert from './../../../../../hooks/useAlert';

const ManageCategories = () => {
  const navigate = useNavigate();
  const {deleteModal, successfulAlertWithAutoClose} = useAlert();
  const [user, loading] = useAuthState(auth);
  const [categories, setCategories] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const URL = `http://localhost:5000/categories`;
      fetch(URL, {
        headers: {
          auth: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDataLoading(false);
          setCategories(data);
        });
    }
  }, [user, reload]);

  if(loading || dataLoading){
      return <Loading />
  }

  const handleCategoryDelete = (id) => {
    deleteModal(()=>{
      const URL = `http://localhost:5000/delete-category/${id}?email=${user?.email}`;
      fetch(URL, {
        method : "DELETE",
        headers : {
          auth : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => res.json())
      .then(res => {
          if(res?.deletedCount){
            successfulAlertWithAutoClose('The category has been deleted');
            // Reload after  delete
            setReload(! reload);
          }
      });
    })
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        {/* Section title */}
        <h2 className="dashboard-title">
          <i className="fa-solid fa-dolly mr-2"></i> Categories
        </h2>

        <button
          className="bg-[#5a76fd] p-2 rounded text-white"
          onClick={() => navigate("add-new")}
        >
          Add New
        </button>
      </div>

      <div className="mt-5">
        <div class="overflow-x-auto">
          <table class="table w-full text-center">
            <thead>
              <tr>
                <th>#No</th>
                <th>IMG</th>
                <th>Name</th>
                <th>Path</th>
                <th>Explore</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <tr key={category?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img src={category?.img} alt="category" className="w-14" />
                  </td>
                  <td>{category?.text}</td>
                  <td>{category?.link && category.link.slice(9, category.link.length)}</td>
                  <td>
                    <button className="p-2 bg-green-500 rounded text-white" onClick={()=> handleCategoryDelete(category?._id)}>Remove</button>
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

export default ManageCategories;
