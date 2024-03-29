import { colors } from "../variables/variables";
import pairs from "../data/pairs.json";
import tickPrecision from "../entities/TickPrecision";
import FinVolumeChart from "../charts/FinSingleVolumeChart";
import VolumesInfoBar from "../components/volumes/VolumesInfoBar";
import { useEffect, useState } from "react";
import FinTotalVolumeChart from "../charts/FinTotalVolumeChart";
import finLogoImg from "../assets/tools/logo_fin.png";


const Fin = () => {
  const [filter, setFilter] = useState("");
  const [charts, setCharts] = useState([]);

  const filteredCharts = () => {
    return charts.filter(chart => {
      return !!(chart.key.toLowerCase().includes(filter.toLowerCase()));
    })
  }

  useEffect(() => {
    // Get all volume charts
    const charts = [];
    for (const pairId in pairs) {
      charts.push(
        <div key={"volume" + pairId} className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Volume (1D)</h5>
              <h3 className="card-title text-white">
                {String(pairId).replace("_", "/")}
              </h3>
              <FinVolumeChart
                tickerId={pairId}
                precision={tickPrecision.day1}
                period={100}
              />
            </div>
          </div>
        </div>
      );
    }
    setCharts(charts);
  }, []);

  return (
    <main className="container py-5">

      <div className="row mb-3 fs-2 fw-bold" style={{ color: colors.title }}>
        <div className="col">
          <div className="d-flex align-items-center justify-content-lg-start justify-content-center">
            <img src={finLogoImg} alt="KUJIRA Track" height="40" className="me-3" />
            <span>FIN Metrics</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3 mb-lg-4">
          <VolumesInfoBar />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Volume(1D)</h5>
              <h3 className="card-title text-white">FIN accumulated volume</h3>
              <FinTotalVolumeChart
                precision={tickPrecision.day1}
                period={365}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3 mb-lg-4">

          <h3 className="text-white fw-light mt-4 mb-3">FIN Pairs individual volumes</h3>

          <input
            id="filter"
            name="filter"
            type="text"
            className="form-control bg-dark border-0 text-white"
            placeholder="Type to filter..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
      </div>

      <div className="row">{ filteredCharts() }</div>
    </main>
  );
};

export default Fin;
