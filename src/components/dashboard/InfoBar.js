import { useState, useEffect } from "react";
import { numberWithCommas } from "../../data/Math";
import Pair from "../../entities/Pair";

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
    const pairKujiAxlusdc = new Pair("KUJI_axlUSDC");
    pairKujiAxlusdc.currentPrice().then((value) => {
      setPrice(Number(value).toFixed(3));
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

  const separatorV = (
    <div className="vr p-0 text-white d-none d-lg-block"></div>
  );
  const separatorH = (
    <hr
      className="text-white my-4 d-block d-lg-none"
      style={{ boxSizing: "border-box" }}
    />
  );

  const colClasses =
    "col text-white fs-5 fw-bold px-4 text-center text-xxl-start";
  const labelClasses = "d-inline d-lg-block d-xxl-inline";
  const valueClasses = "float-lg-none float-xxl-end fw-light text-dark";
  const iconClasses = "bi align-text-top me-3";

  return (
    <div className="blue-gradient-bg rounded p-4 container-fluid">
      <div className="row">
        <div className={colClasses}>
          <span className={labelClasses}>
            <i className={"bi-list-ul " + iconClasses}></i>Total transactions
          </span>
          <div className={valueClasses}> {transactions} </div>
        </div>

        {separatorV}
        {separatorH}

        <div className={colClasses}>
          <span className={labelClasses}>
            <i className={"bi-graph-up-arrow " + iconClasses}></i>
            Kujira/axlUSDC
          </span>
          <div className={valueClasses}> ${price} </div>
        </div>

        {separatorV}
        {separatorH}

        <div className={colClasses}>
          <span className={labelClasses}>
            <i className={"bi-lock " + iconClasses}></i>Total staked
          </span>
          <div className={valueClasses}> {stake} </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
