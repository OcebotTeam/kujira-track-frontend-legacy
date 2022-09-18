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
   * Returns
   * @param precision
   * @returns {Promise<any>}
   */
  this.candlesRawValues = (precision) => {
    const endDate = new Date();
    const startDate = new Date();

    // TODO: add "period" param to replace hardcoded switch.
    switch (precision) {
      case TickPrecision.day1:
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case TickPrecision.month1:
        startDate.setFullYear(startDate.getFullYear() - 6);
        break;
      default:
        startDate.setMinutes(startDate.getMinutes() - precision * 100);
    }

    let endpoint =
      process.env.REACT_APP_API_BRIDGE_URL +
      "/kbridge/candles?contract=" +
      pairs[ticker_id].contract +
      "&precision=" +
      precision +
      "&from=" +
      dateToApiFormat(startDate) +
      "&to=" +
      dateToApiFormat(endDate);

    return fetch(endpoint)
      .then((response) => response.json())
      .then((json) => json.candles)
      .catch((error) => console.log(error));
  };

  this.candlesBarChartValues = (precision) =>
    this.candlesRawValues(precision).then((candles) => {
      // Pointer to last candle.
      let lastCandle = null;

      candles.forEach((candle, index) => {
        // Apply transformation to all candles
        candle.time = candle.bin;

        // Set candles to 0 if it is first item
        if (index === 0) {
          candle.open = candle.open ?? 0;
          candle.close = candle.close ?? 0;
        }
        // Every next candle
        else {
          candle.open = candle.open ?? lastCandle.open;
          candle.close = candle.close ?? lastCandle.close;
        }

        lastCandle = candle;

      });

      return candles;
    });
}

export default Pair;
