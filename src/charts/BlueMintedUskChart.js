import GenericAreaChart from "./GenericAreaChart";
import { MintedUsk } from "../data/Accumulated";
import { useEffect, useState } from "react";

const BlueMintedUskChart = () => {
  const [percentage, setPercentage] = useState(0);
  const [currentMintedUsk, setCurrentMintedUsk] = useState(0);

  const mintedUsk = MintedUsk();

  useEffect(() => {
    mintedUsk.then((values) => {
      const currentMintedUsk = values.at(-1).value;
      setCurrentMintedUsk(values.at(-1).value);
      setPercentage((currentMintedUsk / 10000));
    });
  });

  return (
    <GenericAreaChart data={mintedUsk}>
      <div className="position-relative">
        <div
          className="staked-kuji-legend text-white position-absolute"
          style={{ zIndex: "100" }}
        >
          <span>{Number(currentMintedUsk / 1000).toFixed(2)}K</span>{" "}
          <span className="text-muted">of 1M</span>{" "}
          <span className="fw-bold">({Number(percentage).toFixed(2)}%)</span>
        </div>
      </div>
    </GenericAreaChart>
  );
};

export default BlueMintedUskChart;