import React from "react";

const InputBox = ({value = {}}) => {
    const {name ="", placeholder="Type here", required= false, type = 'text', label="Label name", className = ''} = value;

  return (
    <div className="mb-2">
      <label htmlFor={`${name}`} className="text-gray-500">
        {label}
      </label>


      <input
        type={`${type}`}
        name={`${name}`}
        id={`${name}`}
        placeholder={`${placeholder}`}
        required = {required}
        autoComplete={false}
        className={`p-2 w-full rounded outline-none border border-black ${className}`}
      />
    </div>
  );
};

export default InputBox;
