import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const CandlestickChart = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const barSeries = chart.addCandlestickSeries({
      upColor: colors.teal,
      downColor: colors.blue,
      wickUpColor: colors.teal,
      wickDownColor: colors.blue,
      borderVisible: false
    });

    console.log(data);

    data.then(values => {
      barSeries.setData(values);
      chart.timeScale().fitContent();
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth
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

export default CandlestickChart;
