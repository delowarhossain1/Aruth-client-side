import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';

const ActiveUser = () => {
    const defaultProfileImg = 'https://i.ibb.co/10JxYVW/user.png';
    const [user] = useAuthState(auth);

  return (
    <div className="flex items-center flex-col gap-0 border-b-2 p-2 mb-2">
      <img
        src={user?.photoURL || defaultProfileImg}
        alt="profile"
        className=" w-14 h-14 bg-slate-200 p-1 rounded-full mb-1"
      />
      <div className="text-center ">
        <h2 className="text-md">
          {user?.displayName?.length > 15
            ? user?.displayName?.slice(0, 15) + "..."
            : user?.displayName}
        </h2>
      </div>
    </div>
  );
};

export default ActiveUser;
