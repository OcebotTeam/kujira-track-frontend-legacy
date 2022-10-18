import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";
import Pair from "../data/Pair";
import pairs from "../data/pairs.json";
import { Accumulated } from "../data/Accumulated";

const VolumeChart = (props) => {
  const { precision, period } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = baseChart(chartContainerRef);

    chart.applyOptions({
      leftPriceScale: {
        visible: true,
      },
    });

    // ********* VOLUMES DATA *********

    const histogramSeries = chart.addHistogramSeries({
      color: colors.blue,
      priceFormat: {
        type: "volume",
      },
    });

    const pairVolumes = [];

    for (const pair in pairs) {
      const pairObj = new Pair(pair);
      pairVolumes.push(pairObj.volumesChartValues(precision, period));
    }

    Promise.all(pairVolumes).then((allVolumesData) => {
      const compoundVolumes = {};

      allVolumesData.forEach((pairVolume) => {
        pairVolume.forEach((volumeValue) => {
          if (compoundVolumes["time" + volumeValue.time] === undefined) {
            compoundVolumes["time" + volumeValue.time] = volumeValue;
          } else {
            compoundVolumes["time" + volumeValue.time].value +=
              volumeValue.value;
          }
        });
      });

      histogramSeries.setData(Object.values(compoundVolumes));

      // ********* TRANSACTIONS DATA *********

      const totalTransactions = Accumulated("transactions");

      const lineSeries = chart.addLineSeries({
        color: colors.teal,
        priceScaleId: "left",
        priceFormat: {
          type: "volume",
        },
      });

      totalTransactions.then((values) => {

        const length = values.length;
        for (let i = length - 1; i > 0; i--) {
          values[i].value -= values[i-1].value;
        }

        values.shift();

        //lineSeries.setData(values);
      });
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
  }, [period, precision]);

  return <div ref={chartContainerRef}></div>;
};

export default VolumeChart;
