import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";
import Pair from "../data/Pair";
import pairs from "../data/pairs.json"

const VolumeChart = (props) => {
  const { precision, period } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);
    const histogramSeries = chart.addHistogramSeries({
      color: colors.blue,
      priceFormat: {
        type: "volume",
      },
    });

    const pairVolumes = [];

    for (const pair in pairs) {
      const pairObj = new Pair(pair);
      pairVolumes.push(pairObj.volumesChartValues(precision, period))
    }

    Promise.all(pairVolumes).then((allVolumesData) => {
      const compoundVolumes = {};

      allVolumesData.forEach(pairVolume => {
        pairVolume.forEach(volumeValue => {
          if (compoundVolumes["time" + volumeValue.time] === undefined) {
            compoundVolumes["time" + volumeValue.time] = volumeValue;
          } else {
            compoundVolumes["time" + volumeValue.time].value += volumeValue.value;
          }
        });
      });

      histogramSeries.setData(Object.values(compoundVolumes));
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
  });

  return <div ref={chartContainerRef}></div>;
};

export default VolumeChart;
