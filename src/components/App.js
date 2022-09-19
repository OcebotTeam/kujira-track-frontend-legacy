import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import CandlestickChart from "../charts/CandleStickChart";
import HistogramChart from "../charts/HistogramChart";

function App() {

  const pair = new Pair("KUJI_axlUSDC");
  const evolution = pair.candlesChartValues(TickPrecision.day1);
  const currentPrice = pair.currentPrice().then(price => console.log(price));

  return (
    <main className="app">
      <div className="sidebar">Test Test Test Test</div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <h3>Current price:</h3>
          </div>
          <div className="row">
            <div className="col-6">
              <CandlestickChart data={ evolution }/>
            </div>
            <div className="col-6">
              <HistogramChart data={ evolution } />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
