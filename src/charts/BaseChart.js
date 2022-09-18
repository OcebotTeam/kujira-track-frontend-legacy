import { ColorType, createChart } from "lightweight-charts";
import { colors } from "../variables/variables";

const baseChart = chartContainerRef => {
  return createChart(chartContainerRef.current, {
    layout: {
      background: {
        type: ColorType.Solid,
        color: colors.darkGrey,
      },
      textColor: colors.white,
    },
    grid: {
      vertLines: { color: colors.black },
      horzLines: { color: colors.black },
    },
    width: chartContainerRef.current.clientWidth,
    height: 300,
  });
}

export default baseChart;