import React, { useEffect, useRef } from "react";
import { colors, areaStackColors } from "../variables/variables";
import baseChart from "./BaseChart";

const GenericAreaStackChart = (props) => {
  const { data = [] } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);

    data.then((values) => {
      let counter = values.length;
      for (const series in values) {
        console.log(values[series]);

        const areaSeries = chart.addAreaSeries({
          lineColor: areaStackColors["stack" + counter],
          topColor: areaStackColors["stack" + counter],
          bottomColor: areaStackColors["stack" + counter],
          priceFormat: {
            type: "volume",
          },
        });

        areaSeries.setData(values[series]);
        counter--;
      }

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

export default GenericAreaStackChart;
