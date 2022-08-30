import React from "react";
import DashboardTitle from "../../DashboardTitle";
import { useQuery } from "react-query";
import Loading from "../../../../shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";

const Admins = () => {
  const [user, loading] = useAuthState(auth);
  const defaultProfileImg = "https://i.ibb.co/10JxYVW/user.png";

  const { data: admins, isLoading } = useQuery(["our-admins"], () =>
    fetch(`http://localhost:5000/all-admins?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <section>
      <DashboardTitle
        value={{ text: "Our Admins", icon: "fa-solid fa-chess-queen" }}
      />

      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#No.</th>
                <th>IMG</th>
                <th>Name</th>
                <th>Email</th>
                <th>Take Actin</th>
              </tr>
            </thead>
            <tbody>
              {admins?.map((admin, index) => (
                <tr key={admin?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={admin?.img || defaultProfileImg}
                      className="w-10 h-10 rounded-full"
                      alt="admin pic"
                    />
                  </td>
                  <td>{admin?.name}</td>
                  <td>{admin?.email}</td>
                  <td>
                    <button className={`bg-red-500 p-2 rounded text-white ${admins.length < 2 && 'cursor-not-allowed'}`}
                    disabled={admins.length < 2 ? true : false}>Remove</button>
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

export default Admins;
