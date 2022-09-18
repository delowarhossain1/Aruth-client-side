import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "./../../../../shared/Loading/Loading";
import DashboardTitle from "../../DashboardTitle";
import SelectOption from "../../../../shared/SelectOption/SelectOption";

const Users = () => {
  const [user, loading] = useAuthState(auth);
  const defaultProfileImg = "https://i.ibb.co/10JxYVW/user.png";

  const { data: allUsers, isLoading } = useQuery(["userInfo"], () =>
    fetch(`https://afternoon-cove-39130.herokuapp.com/users?email=${user?.email}`, {
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
      <DashboardTitle
        value={{
          text: "Registered Users",
          icon: "fa-solid fa-user",
        }}
      />

      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#No</th>
                <th>IMG</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={user?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={user?.img || defaultProfileImg}
                      alt="user"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role ? "Admin" : 'User'}</td>
                  <td>
                    <SelectOption
                      value={{
                        width : '150px', 
                        title: "Take action",
                        options: [{ value: "admin", text: "Make admin" }, {value : 'moderator', text : 'Make moderator'}, {value : 'delete', text : 'Delete User'}],
                      }}
                    />
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

export default Users;
