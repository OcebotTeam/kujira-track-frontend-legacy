import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "../variables/variables.css"
import "./App.css";

import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import CandlestickChart from "../charts/CandleStickChart";
import HistogramChart from "../charts/HistogramChart";
import Navbar from "./Navbar";

function App() {

  const pair = new Pair("KUJI_axlUSDC");
  const evolution = pair.candlesChartValues(TickPrecision.day1);
  const currentPrice = pair.currentPrice().then(price => console.log(price));

  return (
    <div className="app">

      <Navbar/>

      <main className="container py-5">

        <div className="row">

          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted">Price (1D)</h5>
                <h3 className="card-title text-white">KUJI/alxUSDC</h3>
                <CandlestickChart data={ evolution }/>
              </div>
            </div>
          </div>


          <div className="col-lg-6 mb-5">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="text-muted">Volume (1D)</h5>
                <h3 className="card-title text-white">KUJI/alxUSDC</h3>
                <HistogramChart data={ evolution } />
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
