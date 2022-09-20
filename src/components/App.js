import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../variables/variables.css";
import "./App.css";

import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import CandlestickChart from "../charts/CandleStickChart";
import HistogramChart from "../charts/HistogramChart";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InfoBar from "./InfoBar";
import PairDataTable from "./PairDataTable";
import AreaChart from "../charts/AreaChart";
import Accumulated from "../data/Accumulated";
import LineChart from "../charts/LineChart";

function App() {
  const kujiUsdcPair = new Pair("KUJI_axlUSDC");
  const kujiUskPair = new Pair("KUJI_USK");

  const kujiUsdcCandles = kujiUsdcPair.candlesChartValues(TickPrecision.day1, 100);
  const kujiUsdcVolumes = kujiUsdcPair.volumesChartValues(TickPrecision.day1, 100);
  const kujiUskVolumes = kujiUskPair.volumesChartValues(TickPrecision.day1, 100);

  const wallets = Accumulated("wallets");
  const stakedTokens = Accumulated("stakedtokens");
  const totalTransactions = Accumulated("transactions");

  return (
    <div className="app">
      <Navbar />

      <main className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Price (1D)</h5>
                <h3 className="card-title text-white">KUJI/alxUSDC</h3>
                <CandlestickChart data={kujiUsdcCandles} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Volume (1D)</h5>
                <h3 className="card-title text-white">KUJI/alxUSDC</h3>
                <HistogramChart data={kujiUsdcVolumes} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col mb-5">
            <InfoBar />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Evolution</h5>
                <h3 className="card-title text-white">Total transactions</h3>
                <LineChart data={totalTransactions} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Volume (1D)</h5>
                <h3 className="card-title text-white">KUJI/USK</h3>
                <HistogramChart data={kujiUskVolumes} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Evolution</h5>
                <h3 className="card-title text-white">Wallets</h3>
                <AreaChart data={wallets} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Evolution</h5>
                <h3 className="card-title text-white">Staked tokens</h3>
                <AreaChart data={stakedTokens} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col mb-5">
            <PairDataTable />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
