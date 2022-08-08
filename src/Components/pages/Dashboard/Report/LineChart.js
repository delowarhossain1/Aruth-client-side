import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const LineChartReport = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("data/ordersReport.json")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-2">
       <LineChart
            width={500}
            height={300}
            data={orders}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            <Line connectNulls type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
    </div>
  );
};

export default LineChartReport;
