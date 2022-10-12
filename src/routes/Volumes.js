import { colors } from "../variables/variables";
import pairs from "../data/pairs.json";
import tickPrecision from "../data/TickPrecision";
import FinVolumeChart from "../charts/FinSingleVolumeChart";
import VolumesInfoBar from "../components/volumes/VolumesInfoBar";
import { useEffect, useState } from "react";
import FinTotalVolumeChart from "../charts/FinTotalVolumeChart";

const Volumes = () => {
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
      <h1
        className="mb-3 fs-2 fw-bold text-uppercase"
        style={{ color: colors.bgLight }}
      >
        Volumes
      </h1>

      <div className="row">
        <div className="col mb-3 mb-lg-4">
          <VolumesInfoBar />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Volume (1D)</h5>
              <h3 className="card-title text-white">
                FIN Total volume
              </h3>
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

export default Volumes;
