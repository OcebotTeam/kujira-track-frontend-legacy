import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import GenericCandleStickChart from "../charts/GenericCandleStickChart";
import { colors } from "../variables/variables";
import MantaTotalVolumeChart from "../charts/MantaTotalVolumeChart";
import tickPrecision from "../data/TickPrecision";
import Card from "../components/shared/Card";

import mantaLogoImg from "../assets/tools/logo_manta.png";

const Manta = () => {
  const MntaUsdcPair = new Pair("MNTA_axlUSDC");

  const MntaUsdcCandles = MntaUsdcPair.candlesChartValues(
    TickPrecision.day1,
    100
  );

  const twoColumnColClasses = "col-lg-6 mb-3 mb-lg-4";

  return (
    <main className="container py-5">

      <div className="row mb-3 fs-2 fw-bold" style={{ color: colors.title }}>
        <div className="col">
          <div className="d-flex align-items-center justify-content-lg-start justify-content-center">
            <img src={mantaLogoImg} alt="KUJIRA Track" height="40" className="me-3" />
            <span>MANTA Metrics</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className={twoColumnColClasses}>
          <Card title="MNTA/axlUSDC" overTitle="Price (1D)">
            <GenericCandleStickChart data={MntaUsdcCandles} />
          </Card>
        </div>

        <div className={twoColumnColClasses}>
          <Card
            title="MNTA pairs total volume"
            overTitle="Volume (1D) / SMA (30)"
          >
            <MantaTotalVolumeChart precision={tickPrecision.day1} period={365} />
          </Card>
        </div>
      </div>

    </main>
  );
};

export default Manta;