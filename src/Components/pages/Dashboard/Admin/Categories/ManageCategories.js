import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from "../../../../shared/Loading/Loading";
import auth from './../../../../../firebase.init';

const ManageCategories = () => {
    const [user, loading] = useAuthState(auth);
    const [categories, setCategories] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(()=>{
        const URL = ``;
        fetch(URL, {
            headers : {
                auth : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setDataLoading(false);
            setCategories(data)
        })

    }, [user]);


    if(loading || dataLoading){
        return <Loading />
    }
    
  return (
    <section>
      <div className="flex items-center justify-between">
        {/* Section title */}
        <h2 className="dashboard-title">
          <i className="fa-solid fa-dolly mr-2"></i> Categories
        </h2>

        <button className="bg-[#5a76fd] p-2 rounded text-white">Add New</button>
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
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageCategories;
