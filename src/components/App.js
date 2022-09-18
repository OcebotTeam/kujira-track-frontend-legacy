import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Pair from "../data/Pair";
import TickPrecision from "../data/TickPrecision";
import CandlestickChart from "../charts/CandleStickChart";

function App() {

  const pair = new Pair("KUJI_axlUSDC");
  const priceEvolution = pair.candlesBarChartValues(TickPrecision.day1);

  return (
    <main className="app">
      <div className="sidebar">Test Test Test Test</div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <CandlestickChart data={ priceEvolution }/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
