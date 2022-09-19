import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const BarChart = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const barSeries = chart.addBarSeries({
      upColor: colors.blue,
      downColor: colors.teal
    });

    data.then(values => {
      barSeries.setData(values);
      chart.timeScale().fitContent();
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};

export default BarChart;
