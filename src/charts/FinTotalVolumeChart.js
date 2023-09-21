import React, { useEffect, useRef } from "react";
import { colors } from "../variables/variables";
import baseChart from "./BaseChart";
import Pair from "../entities/Pair";
import pairs from "../data/pairs.json";
import { Accumulated } from "../data/Accumulated";

const VolumeChart = (props) => {
  const { precision, period } = props;
  const chartContainerRef = useRef();

  function calculateSMA(data, count) {
    data = Object.values(data)
    var avg = function(data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
         sum += data[i].value;
      }
      return sum / data.length;
    };

    var result = [];

    for (var i=count - 1, len=data.length; i < len; i++){
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val});
    }
    return result;
  }

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

      // **** SMA

      var smaData = calculateSMA(compoundVolumes, 30);
      var smaLine = chart.addLineSeries({
        color: 'rgba(96, 251, 208, 1)',
        lineWidth: 2,
      });
      smaLine.setData(smaData);

      // ********* TRANSACTIONS DATA *********

      const totalTransactions = Accumulated("transactions");

      const lineSeries = chart.addLineSeries({
        color: colors.teal,
        priceScaleId: "left",
        priceFormat: {
          type: "volume",
        },
      });

      lineSeries.applyOptions({
        scaleMargins: {
          top: 0.1, // highest point of the series will be 10% away from the top
          bottom: 0.4, // lowest point will be 40% away from the bottom
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
  }, []);

  return <div ref={chartContainerRef}></div>;
};

export default VolumeChart;
