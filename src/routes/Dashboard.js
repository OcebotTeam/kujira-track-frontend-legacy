import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import { Accumulated } from "../data/Accumulated";
import InfoBar from "../components/dashboard/InfoBar";
import PairDataTable from "../components/dashboard/PairDataTable";
import GenericCandleStickChart from "../charts/GenericCandleStickChart";
import GenericVolumeChart from "../charts/GenericVolumeChart";
import GenericLineChart from "../charts/GenericLineChart";
import GenericAreaChart from "../charts/GenericAreaChart";
import { colors } from "../variables/variables";
import FinTotalVolumeChart from "../charts/FinTotalVolumeChart";
import tickPrecision from "../data/TickPrecision";
import BlueStakedKujiChart from "../charts/BlueStakedKujiChart";
import Card from "../components/shared/Card";

const Dashboard = () => {
  const kujiUsdcPair = new Pair("KUJI_axlUSDC");
  const kujiUskPair = new Pair("KUJI_USK");

  const kujiUsdcCandles = kujiUsdcPair.candlesChartValues(
    TickPrecision.day1,
    100
  );
  const kujiUskVolumes = kujiUskPair.volumesChartValues(
    TickPrecision.day1,
    100
  );

  const wallets = Accumulated("wallets");
  const totalTransactions = Accumulated("transactions");

  return (
    <main className="container py-5">
      <h1
        className="mb-3 fs-2 fw-bold text-uppercase"
        style={{ color: colors.bgLight }}
      >
        Dashboard
      </h1>

      <div className="row">
        <div className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Price (1D)</h5>
              <h3 className="card-title text-white">KUJI/alxUSDC</h3>
              <GenericCandleStickChart data={kujiUsdcCandles} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">
                Volume / Transactions (1D)
              </h5>
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
          <InfoBar />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-2 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Evolution</h5>
              <h3 className="card-title text-white">Total transactions</h3>
              <GenericLineChart data={totalTransactions} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Volume (1D)</h5>
              <h3 className="card-title text-white">KUJI/USK</h3>
              <GenericVolumeChart data={kujiUskVolumes} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3 mb-lg-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="text-muted fw-light">Evolution</h5>
              <h3 className="card-title text-white">Wallets</h3>
              <GenericAreaChart data={wallets} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-3 mb-lg-4">
          <Card title="Staked KUJI" overTitle="Evolution">
            <BlueStakedKujiChart />
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
