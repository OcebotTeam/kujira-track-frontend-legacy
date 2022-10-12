import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericVolumeChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const histogramSeries = chart.addHistogramSeries({
      color: colors.blue,
      priceFormat: {
        type: "volume",
      },
    });

    data.then(values => {
      histogramSeries.setData(values);
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

export default GenericVolumeChart;
