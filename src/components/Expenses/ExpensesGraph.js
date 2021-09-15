import React from "react";
import { Line } from "@ant-design/charts";

const ExpensesGraph = (props) => {
  const data = props.data;
  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: true,
    xField: "label",
    yField: "value",
    color: "#666362",
    point: {
      size: 5,
      shape: "circle",
      color: "#aaa"
    },
    label: {
      style: {
        fill: "black",
      },
    },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
};
export default ExpensesGraph;
