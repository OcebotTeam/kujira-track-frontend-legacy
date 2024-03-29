import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericCandleStickChart = (props) => {
  const { data, upColor } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const barSeries = chart.addCandlestickSeries({
      upColor: upColor ?? colors.teal,
      downColor: colors.blue,
      wickUpColor: upColor ?? colors.teal,
      wickDownColor: colors.blue,
      borderVisible: false
    });

    data.then(values => {
      barSeries.setData(values);
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

export default GenericCandleStickChart;
