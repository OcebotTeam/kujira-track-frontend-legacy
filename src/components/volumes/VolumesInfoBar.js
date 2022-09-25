import { useEffect, useState } from "react";
import pairs from "../../data/pairs.json";
import Pair from "../../data/Pair";

const VolumesInfoBar = () => {
  const [lastDayVol, setLastDayVolume] = useState(0);

  useEffect(() => {
    for (const pairId in pairs) {
      const pair = new Pair(pairId);
      pair.lastDayVolume().then((value) => {
        setLastDayVolume((prev) => {
          return prev + value;
        });
      });
    }
  }, []);

  return (
    <div className="blue-gradient-bg rounded p-4 container-fluid">
      <div className="row">
        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline">
            <i className="bi bi-bar-chart-fill align-text-top me-3"></i>
            Accumulated volume{" "}
            <span className="text-dark fw-light">/ yesterday</span>
          </span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark">
            ${lastDayVol}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumesInfoBar;
