import { useState, useEffect } from "react";
import { numberWithCommas } from "../../data/Math";

const InfoBar = () => {
  const [transactions, setTransactions] = useState("...");
  const [price, setPrice] = useState("...");
  const [stake, setStake] = useState("...");

  const getTotalTransactions = () => {
    fetch(process.env.REACT_APP_API_BRIDGE_URL + "/kbridge/txs/count").then(
      (response) => {
        response
          .json()
          .then((json) => {
            setTransactions(numberWithCommas(json.count));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const getKujiraCurrentPrice = () => {
    fetch(
      process.env.REACT_APP_API_BRIDGE_URL +
        "/kbridge/coingecko/orderbook?ticker_id=KUJI_axlUSDC"
    ).then((response) => {
      response
        .json()
        .then((json) => {
          const last_price = json.asks.shift().shift();
          var currentPrice = parseFloat(last_price).toFixed(3);
          setPrice(currentPrice);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const getStakedTokens = () => {
    fetch(process.env.REACT_APP_API_BRIDGE_URL + "/kbridge/staking/pool").then(
      (response) => {
        response
          .json()
          .then((json) => {
            let tokens = parseInt(json.pool.bonded_tokens / 1000000);
            tokens = numberWithCommas(tokens);
            setStake(tokens);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  useEffect(() => {
    getTotalTransactions();
    getKujiraCurrentPrice();
    getStakedTokens();
  }, []);

  return (
    <div className="blue-gradient-bg rounded p-4 container-fluid">
      <div className="row">
        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-list-ul align-text-top me-3"></i>Total transactions</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> {transactions} </div>
        </div>

        <div className="vr p-0 text-white d-none d-lg-block"></div>
        <hr className="text-white my-4 d-block d-lg-none" style={{ boxSizing: "border-box"}}/>

        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-graph-up-arrow align-text-top me-3"></i>Kujira/axlUSDC</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> ${price} </div>
        </div>

        <div className="vr p-0 text-white d-none d-lg-block"></div>
        <hr className="text-white my-4 d-block d-lg-none" style={{ boxSizing: "border-box"}} />

        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-lock align-text-top me-3"></i>Total staked</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> {stake} </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
