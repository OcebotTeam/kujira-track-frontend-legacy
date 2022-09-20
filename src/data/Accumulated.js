const Accumulated = (item) => {
  const walletsEndpoint = process.env.REACT_APP_API_BRIDGE_URL + "/" + item;

  return  fetch(walletsEndpoint)
    .then((response) => response.json())
    .then((json) => json[item])
    .catch((error) => console.log(error));
};

export default Accumulated;
