import { useEffect, useState } from "react";
import pairs from "../../data/pairs.json";
import Pair from "../../entities/Pair";

const VolumesInfoBar = () => {
  const [lastDayVol, setLastDayVolume] = useState(0);
  const [lastDayFees, setLastDayFees] = useState(0);

  useEffect(() => {
    const lastDayVolumePromises = [];

    for (const pairId in pairs) {
      const pair = new Pair(pairId);
      lastDayVolumePromises.push(pair.lastDayVolume());
    }


    Promise.all(lastDayVolumePromises).then((values) => {
      const initialValue = 0;
      setLastDayVolume(
        values.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        )
      );
    });
  }, []);

  useEffect(() => {

    const lastDayFeesAccuredPromises = [];

    for (const pairId in pairs) {
      const pair = new Pair(pairId);
      if(pairId!=='axlUSDC_USDC'){
        lastDayFeesAccuredPromises.push(pair.lastDayVolume());
      }
    }


    Promise.all(lastDayFeesAccuredPromises).then((values) => {
      const initialValue = 0;
      setLastDayFees(
          (values.reduce(
              (previousValue, currentValue) => (previousValue + currentValue),
              initialValue
          )*0.0025).toFixed(2)
      );
    });
  }, []);


  const separatorV = (
      <div className="vr p-0 text-white d-none d-lg-block"></div>
  );
  const separatorH = (
      <hr
          className="text-white my-4 d-block d-lg-none"
          style={{ boxSizing: "border-box" }}
      />
  );
  return (
    <div className="blue-gradient-bg rounded p-4 container-fluid fs">
      <div className="row">
        <div className="col text-white fs-5 fw-bold px-4 text-center text-md-start">
          <span className="d-block d-md-inline">
            <i className="bi bi-bar-chart-fill align-text-top me-3"></i>
            Accumulated volume
          </span>
          <span className="text-dark fw-light d-none d-md-inline mx-2">/</span>
          <span className="text-dark fw-light">yesterday</span>
          <div className="float-md-end fw-light text-dark">${lastDayVol}</div>
        </div>
        {separatorV}
        {separatorH}
        <div className="col text-white fs-5 fw-bold px-4 text-center text-md-start">
          <span className="d-block d-md-inline">
            <i className="bi bi bi-cash-coin align-text-top me-3"></i>
            Accumulated Fees
          </span>
          <span className="text-dark fw-light d-none d-md-inline mx-2">/</span>
          <span className="text-dark fw-light">yesterday</span>

          <div className="float-md-end fw-light text-dark">${lastDayFees}</div>
        </div>
      </div>
    </div>
  );
};

export default VolumesInfoBar;
