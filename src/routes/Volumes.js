import { colors } from "../variables/variables";
import pairs from "../data/pairs.json";
import tickPrecision from "../data/TickPrecision";
import FinVolumeChart from "../charts/FinVolumeChart";

const Volumes = () => {

  const volumeCharts = () => {
    const charts = [];

    for (const pairId in pairs) {
      charts.push(
        <div key={"volume" + pairId} className="col col-lg-6 mb-3">
          <FinVolumeChart tickerId={pairId} precision={tickPrecision.day1} period={100} />
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
        { volumeCharts() }
      </div>
    </main>
  );
};

export default Volumes;
