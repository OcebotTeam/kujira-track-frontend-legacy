import { useEffect, useState } from "react";
import Pair from "../data/Pair";
import { numberWithCommas } from "../data/Math";

const PairDataTableRow = (props) => {
  const { ticker_id } = props;

  const [volume, setVolume] = useState("...");
  const [price, setPrice] = useState("...");

  useEffect(() => {
    const pair = new Pair(ticker_id);
    const volume = pair.lastDayVolume();
    const price = pair.currentPrice();

    volume.then((value) => setVolume(numberWithCommas(value.toFixed(0))));
    price.then((value) => setPrice(value.toFixed(3)));
  }, [ticker_id]);

  return (
    <tr>
      <td className="text-muted">{String(ticker_id).replace("_", "/")}</td>
      <td className="text-center">${price}</td>
      <td className="text-end">${volume}</td>
    </tr>
  );
};

export default PairDataTableRow;
