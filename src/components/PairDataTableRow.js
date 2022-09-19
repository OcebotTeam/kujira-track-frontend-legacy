import { useEffect, useState } from "react";
import Pair from "../data/Pair";

const PairDataTableRow = (props) => {
  const { ticker_id } = props;

  const [volume, setVolume] = useState("...");

  useEffect(() => {
    const pair = new Pair(ticker_id);
    const volume = pair.lastDayVolume();
    volume.then(value => setVolume(value));
  }, [ticker_id]);

  return (
    <tr>
      <td className="text-muted">{ticker_id}</td>
      <td className="text-center">$000</td>
      <td className="text-end">${volume}</td>
    </tr>
  );
};

export default PairDataTableRow;
