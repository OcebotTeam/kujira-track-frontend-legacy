import React, { useEffect, useRef } from "react";
import { colors, areaStackColors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericAreaStackChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);

    data.then((values) => {
      const areaSeries = chart.addAreaSeries({
        lineColor: areaStackColors["stack1"],
        topColor: areaStackColors["stack1"],
        bottomColor: areaStackColors["stack1"],
        priceFormat: {
          type: "volume",
        },
      });

      areaSeries.setData(values);
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

  return <div className={props.className} ref={chartContainerRef}>{props.children}</div>;
};

export default GenericAreaStackChart;
