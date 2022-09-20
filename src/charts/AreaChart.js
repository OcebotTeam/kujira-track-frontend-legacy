import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const AreaChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const areaSeries = chart.addAreaSeries({
      lineColor: colors.darkBlue,
      topColor: colors.blue,
      bottomColor: colors.blue,
    });

    data.then((values) => {
      areaSeries.setData(values);
      //chart.timeScale().fitContent();
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

export default AreaChart;
