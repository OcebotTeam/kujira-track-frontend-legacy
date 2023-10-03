import GenericAreaChart from "./GenericAreaChart";
import { MantaStaked } from "../data/Accumulated";
import { useEffect, useState } from "react";

const BlueStakedMantaChart = () => {
  const [percentage, setPercentage] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);

  const stakedTokens = MantaStaked();

  useEffect(() => {
    stakedTokens.then((values) => {
      const currentStake = values.at(-1).value;
      setCurrentStake(values.at(-1).value);
      setPercentage(currentStake);
    });
  });

  return (
    <GenericAreaChart data={stakedTokens}>
      <div
        className="text-white"
        style={{ zIndex: "100" }}
      >
        <span>{Number(currentStake).toFixed(2)}M</span>{" "}
        <span className="text-muted">of 100M</span>{" "}
        <span className="fw-bold">({Number(percentage).toFixed(2)}%)</span>
      </div>
    </GenericAreaChart>
  );
};

export default BlueStakedMantaChart;
