/**
 * @param number
 * @returns {string}
 */
export function numberWithCommas(number) {
  if(number === null || number === 0 || isNaN(number)){
    return 'No data available';
  }
  if(number === undefined){
    return 0;
  }
  var parts = number.toString().split(",");
  parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return parts.join(".");
}