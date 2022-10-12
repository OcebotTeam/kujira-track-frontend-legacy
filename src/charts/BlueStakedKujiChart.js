import GenericAreaChart from "./GenericAreaChart";
import { StakedTokens } from "../data/Accumulated";
import { useEffect, useState } from "react";

const BlueStakedKujiChart = () => {
  const [percentage, setPercentage] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);

  const stakedTokens = StakedTokens();

  useEffect(() => {
    stakedTokens.then((values) => {
      const currentStake = values.at(-1).value;
      setCurrentStake(values.at(-1).value);
      setPercentage((currentStake / 122396287) * 100);
    });
  });

  return (
    <GenericAreaChart data={stakedTokens}>
      <div className="position-relative">
        <div
          className="staked-kuji-legend text-white position-absolute"
          style={{ zIndex: "100" }}
        >
          <span>{Number(currentStake / 1000000).toFixed(2)}M</span>{" "}
          <span className="text-muted">of 122.39M</span>{" "}
          <span className="fw-bold">({Number(percentage).toFixed(2)}%)</span>
        </div>
      </div>
    </GenericAreaChart>
  );
};

export default BlueStakedKujiChart;
