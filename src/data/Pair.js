import pairs from "./pairs.json";
import TickPrecision from "./TickPrecision";

/**
 * Converts Date to UTC time zone and returns the appropriate format for Kujira API.
 *
 * @param date
 * @param tzString
 * @returns {String}
 */
const dateToApiFormat = (date, tzString = "UTC") => {
  const formatedDate = new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );

  return formatedDate.toISOString();
};

/**
 * Pair object
 *
 * @param ticker_id
 * @constructor
 */
function Pair(ticker_id) {
  /**
   * Returns the current pair market price
   * @returns {Promise<any>}
   */
  this.currentPrice = () => {
    const endpoint =
      process.env.REACT_APP_API_BRIDGE_URL +
      "/kbridge/trades?contract=" +
      pairs[ticker_id].contract;

    return fetch(endpoint)
      .then((response) => response.json())
      .then(
        (json) =>
          json.trades.filter((trade) => trade.type === "buy").shift()
            .trade_price
      )
      .catch((error) => console.log(error));
  };

  /**
   * Returns candle raw values from de API given a precision period
   * @param precision {TickPrecision}
   * @param periods {number} amount of historic data in days
   * @returns {Promise<any>}
   */
  this.candlesRawValues = (precision, periods) => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - periods);

    let endpoint =
      process.env.REACT_APP_API_BRIDGE_URL +
      "/kbridge/candles?contract=" +
      pairs[ticker_id].contract +
      "&precision=" +
      precision +
      "&from=" +
      dateToApiFormat(fromDate) +
      "&to=" +
      dateToApiFormat(toDate);

    return fetch(endpoint)
      .then((response) => response.json())
      .then((json) => json.candles)
      .catch((error) => console.log(error));
  };

  this.lastDayVolume = () => {
    return this.candlesRawValues(TickPrecision.day1, 1).then((candles) => {
      return candles.pop().volume;
    });
  };

  this.candlesChartValues = (precision, periods) => {
    return this.candlesRawValues(precision, periods).then((candles) => {
      return candles.map((candle) => {
        // Time in UTCTimestamp format
        candle.time = Math.floor(new Date(candle.bin) / 1000);
        candle.value = candle.volume;

        // Clean empty candles
        if (candle.close == null && candle.open == null) {
          return { time: candle.time };
        }

        return candle;
      });
    });
  };
}

export default Pair;
