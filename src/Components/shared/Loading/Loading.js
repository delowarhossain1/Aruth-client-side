import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <HashLoader color="#895efc" loading size={50} />
    </div>
  );
};

export default Loading;
