import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "./../../../../shared/Loading/Loading";

const Users = () => {
  const [user, loading] = useAuthState(auth);

  const { data: allUsers, isLoading } = useQuery(["userInfo"], () =>
    fetch(`http://localhost:5000/users?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#No</th>
                <th>IMG</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={user?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img src={user?.img} alt="user" className="w-12 h-12 rounded-full" />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;
