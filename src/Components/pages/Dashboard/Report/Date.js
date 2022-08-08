import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const Date = () => {
  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  return (
    <div className="shadow-lg">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
};

export default Date;
