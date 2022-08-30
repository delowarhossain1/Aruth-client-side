import React from "react";

const SelectOption = ({ value = {}, ...rest }) => {
  const {
    title = "Title here",
    options = [],
    required = false,
    name = "",
    width = "200px",
  } = value;

  return (
    <select
      className={`min-w-[${width}] p-2 border border-black rounded cursor-pointer outline-none`}
      defaultValue="title"
      required={required}
      name={name}
      {...rest}
    >
      <option disabled value="title">
        {title}
      </option>
      {options?.map((option, index) => (
        <option value={option?.value} key={Math.random() * index}>
          {option?.text}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
