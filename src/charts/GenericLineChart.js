import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericLineChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const lineSeries = chart.addLineSeries({
      color: colors.blue,
      priceFormat: {
        type: "volume",
      },
    });

    data.then((values) => {
      lineSeries.setData(values);

      // Prevent gaps in desktop when there is no enough historic values.
      if (document.body.clientWidth >= 768 && values.length < 80) {
        chart.timeScale().fitContent();
      }
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

export default GenericLineChart;
