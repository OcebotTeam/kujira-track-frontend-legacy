import "./PairDataTable.css";

import pairs from "../data/pairs.json";
import PairDataTableRow from "./PairDataTableRow";

const PairDataTable = () => {
  const tableRows = () => {
    let rows = [];
    for (const pair in pairs) {
      rows.push(<PairDataTableRow key={pair} ticker_id={pair} />);
    }
    return rows;
  };

  return (
    <div className="pair-data-table">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <table className="table text-white">
            <thead>
              <tr>
                <th>
                  <h5>FIN Pairs</h5>
                </th>
                <th className="text-center">Price</th>
                <th className="text-end"><i className="bi bi-bar-chart me-2"></i>Last day volume</th>
              </tr>
            </thead>

            <tbody>{tableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PairDataTable;
