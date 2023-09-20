import Pairs from "./pairs.json";
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
   * Returns candle raw values from de API given a precision period
   * @param precision {TickPrecision}
   * @param periods {number} amount of historic data in days
   * @returns {Promise<any>}
   */
  this.candlesRawValues = (precision, periods) => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - periods + 1);

    let endpoint =
      process.env.REACT_APP_API_BRIDGE_URL +
      "/kbridge/candles?contract=" +
      Pairs[ticker_id].contract +
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

  /**
   * Returns candle raw values from de API given a precision period. It might be cached.
   * @param precision {TickPrecision}
   * @param periods {number} amount of historic data in days
   * @returns {Promise<any>}
   */
  this.candlesCachedRawValues = (precision, periods) => {
    const toDate = new Date();
    const fromDate = new Date();

    toDate.setSeconds(0);
    toDate.setMinutes(0);
    fromDate.setSeconds(0);
    fromDate.setMinutes(0);

    fromDate.setDate(fromDate.getDate() - periods + 1);

    let endpoint =
        process.env.REACT_APP_API_BRIDGE_URL +
        "/kbridge/cached/candles?contract=" +
        Pairs[ticker_id].contract +
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

  /**
   * Returns the current pair market price
   * @returns {Promise<Number>}
   */
  this.currentPrice = () => {
    return this.candlesRawValues(TickPrecision.day1, 30).then((candles) => {
      for (let i = candles.length - 1; i >= 0; i--) {
        if (candles[i].close !== null) {
          let price = candles[i].close;

          if (Pairs[ticker_id].priceMultiplier !== undefined) {
            price *= Pairs[ticker_id].priceMultiplier;
          }

          return Number(price);
        }
      }
    });
  };

  /**
   * Returns last day pair market price
   * @returns {Promise<Number>}
   */
  this.lastDayPrice = () => {
    return this.candlesRawValues(TickPrecision.day1, 30).then((candles) => {
      for (let i = candles.length - 2; i >= 0; i--) {
        if (candles[i].close !== null) {
          let price = candles[i].close;

          if (Pairs[ticker_id].priceMultiplier !== undefined) {
            price *= Pairs[ticker_id].priceMultiplier;
          }

          return Number(price);
        }
      }
    });
  };

  /**
   * Returns last day total volume
   * @returns {Promise<Number>}
   */
  this.lastDayVolume = () => {
    return this.volumesChartValues(TickPrecision.day1, 2).then(
      (values) => values[values.length -2].value
    );
  };

  /**
   * Returns candles data adapted to Lightweigth Charts library.
   * @returns {Promise<Array>}
   */
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

  /**
   * Returns histogram data adapted to Lightweigth Charts library.
   * @returns {Promise<Array>}
   */
  this.volumesChartValues = (precision, periods) => {
    const nominativeTickerId = Pairs[ticker_id].nominative;
    const ethDivider = Pairs[ticker_id].ethDivider;
    const divider = (ethDivider!==undefined) ? 1000000000000000000 : 1000000;

    if (nominativeTickerId !== undefined) {
      const nominativePair = new Pair(nominativeTickerId);

      return this.candlesCachedRawValues(precision, periods).then((candles) => {
        return nominativePair.candlesCachedRawValues(precision, periods).then((nomCandles) => {
          let peridod = nomCandles.length - 1;
          return candles.toReversed().map((candle) => {
            let nomPrice = 0;

            if (typeof nomCandles[peridod] !== 'undefined') {
              nomPrice = nomCandles[peridod].close ?? 0;
            }
            peridod--;

            const result = {
              time: Math.floor(new Date(candle.bin) / 1000),
              value: Math.floor(candle.volume / divider * nomPrice),
            };
            return result;
          }).toReversed();
        });
      });
    }
    else {
      return this.candlesCachedRawValues(precision, periods).then((candles) => {
        return candles.map((candle) => {
          return {
            time: Math.floor(new Date(candle.bin) / 1000),
            value: Math.floor(candle.volume / divider)
          };
        });
      });
    }
  };
}

export default Pair;
