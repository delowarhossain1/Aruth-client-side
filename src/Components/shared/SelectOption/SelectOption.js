import React from "react";

const SelectOption = ({value = {}}) => {
    const {title = "Title here", options = []} = value;

  return (
    <select className=" min-w-[200px] p-2 border border-black rounded cursor-pointer outline-none" defaultValue='title'>
      <option disabled value="title">{title} </option>
      {
        options?.map((option, index) => (
            <option value={option?.value} key={Math.random() * index}>{option?.text}</option>
        ))
      }
    </select>
  );
};

export default SelectOption;
