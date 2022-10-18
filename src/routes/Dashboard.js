import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import { Accumulated } from "../data/Accumulated";
import InfoBar from "../components/dashboard/InfoBar";
import PairDataTable from "../components/dashboard/PairDataTable";
import GenericCandleStickChart from "../charts/GenericCandleStickChart";
import GenericLineChart from "../charts/GenericLineChart";
import GenericAreaChart from "../charts/GenericAreaChart";
import { colors } from "../variables/variables";
import FinTotalVolumeChart from "../charts/FinTotalVolumeChart";
import tickPrecision from "../data/TickPrecision";
import BlueStakedKujiChart from "../charts/BlueStakedKujiChart";
import Card from "../components/shared/Card";
import BlueMintedUskChart from "../charts/BlueMintedUskChart";

import kujiLogoImg from "../assets/tokens/kuji/logo.png";
import uskLogoImg from "../assets/tokens/usk/logo.png";

const Dashboard = () => {
  const kujiUsdcPair = new Pair("KUJI_axlUSDC");

  const kujiUsdcCandles = kujiUsdcPair.candlesChartValues(
    TickPrecision.day1,
    100
  );

  const wallets = Accumulated("wallets");
  const totalTransactions = Accumulated("transactions");

  const oneColumnColClasses = "col mb-3 mb-lg-4";
  const twoColumnColClasses = "col-lg-6 mb-3 mb-lg-4";

  return (
    <main className="container py-5">
      <h1
        className="mb-3 fs-2 fw-bold text-uppercase"
        style={{ color: colors.bgLight }}
      >
        Dashboard
      </h1>

      <div className="row">
        <div className={twoColumnColClasses}>
          <Card title="KUJI/alxUSDC" overTitle="Price (1D)">
            <GenericCandleStickChart data={kujiUsdcCandles} />
          </Card>
        </div>

        <div className={twoColumnColClasses}>
          <Card
            title="FIN accumulated volume"
            overTitle="Volume (1D)"
          >
            <FinTotalVolumeChart precision={tickPrecision.day1} period={365} />
          </Card>
        </div>
      </div>

      <div className="row">
        <div className={oneColumnColClasses}>
          <InfoBar />
        </div>
      </div>

      <div className="row">
        <div className={twoColumnColClasses}>
          <Card
            title="Staked KUJI"
            overTitle="Evolution"
            imageTitle={kujiLogoImg}
          >
            <BlueStakedKujiChart />
          </Card>
        </div>

        <div className={twoColumnColClasses}>
          <Card
            title="Minted USK"
            overTitle="Evolution"
            imageTitle={uskLogoImg}
          >
            <BlueMintedUskChart />
          </Card>
        </div>
      </div>

      <div className="row">
        <div className={twoColumnColClasses}>
          <Card title="Wallets" overTitle="Evolution">
            <GenericAreaChart data={wallets} />
          </Card>
        </div>

        <div className={twoColumnColClasses}>
          <Card title="Total transactions" overTitle="Evolution">
            <GenericLineChart data={totalTransactions} />
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3 mb-lg-4">
          <PairDataTable />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
