import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericAreaChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const areaSeries = chart.addAreaSeries({
      lineColor: colors.blue,
      topColor: colors.blue,
      bottomColor: colors.blue,
      priceFormat: {
        type: "volume",
      },
    });

    data.then((values) => {
      areaSeries.setData(values);

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

  return <div ref={chartContainerRef}>{props.children}</div>;
};

export default GenericAreaChart;
