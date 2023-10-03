const Accumulated = (item) => {
  const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/" + item;

  return  fetch(walletsEndpoint)
    .then((response) => response.json())
    .then((json) => json[item])
    .catch((error) => console.log(error));
};

const MintedUsk = () => {
  const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/uskminted";

  return  fetch(walletsEndpoint)
    .then((response) => response.json())
    .then((json) => json.uskminted.map(item => {
      item.value /= 1000000;
      return item;
    }))
    .catch((error) => console.log(error));
};

const MintedUskStack = () => {
    const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/v2/uskminted";

    return fetch(walletsEndpoint)
        .then((response) => response.json())
        .then(json => {
            const CollateralSet = json.uskminted;
            for (let collateral in CollateralSet) {
                CollateralSet[collateral] = CollateralSet[collateral].map(item => {
                    item.value /= 1000000;
                    return item;
                });
            }
            console.log(CollateralSet)
            return CollateralSet;
        })
        .catch((error) => console.log(error));
};

const StakedTokens = () => {
  const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/stakedtokens";

  return  fetch(walletsEndpoint)
    .then((response) => response.json())
    .then((json) => json.stakedtokens.map(item => {
      item.value /= 1000000;
      return item;
    }))
    .catch((error) => console.log(error));
};

const MantaStaked = () => {
    const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/mantastaked";

    return  fetch(walletsEndpoint)
        .then((response) => response.json())
        .then((json) => json.mantastaked.map(item => {
            item.value /= 1000000;
            return item;
        }))
        .catch((error) => console.log(error));
};

export {Accumulated, StakedTokens, MintedUsk, MintedUskStack, MantaStaked};
