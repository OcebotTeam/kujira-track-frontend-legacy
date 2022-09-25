import { colors } from "../variables/variables";
import pairs from "../data/pairs.json";
import tickPrecision from "../data/TickPrecision";
import FinVolumeChart from "../charts/FinVolumeChart";
import VolumesInfoBar from "../components/volumes/VolumesInfoBar";

const Volumes = () => {

  const volumeCharts = () => {
    const charts = [];

    for (const pairId in pairs) {
      charts.push(
        <div key={"volume" + pairId} className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Volume (1D)</h5>
              <h3 className="card-title text-white">{String(pairId).replace("_", "/")}</h3>
              <FinVolumeChart tickerId={pairId} precision={tickPrecision.day1} period={100} />
            </div>
          </div>
        </div>
      );
    }

    return charts;
  };

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
          <input type="text" className="form-control bg-dark border-0" placeholder="Type to filter..." />
        </div>
      </div>

      <div className="row">
        { volumeCharts() }
      </div>
    </main>
  );
};

export default Volumes;
