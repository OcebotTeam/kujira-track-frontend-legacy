import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
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

function App() {
  const pair = new Pair("KUJI_axlUSDC");
  const candles = pair.candlesChartValues(TickPrecision.day1, 100);

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
                <CandlestickChart data={candles} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted fw-light">Volume (1D)</h5>
                <h3 className="card-title text-white">KUJI/alxUSDC</h3>
                <HistogramChart data={candles} />
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
