import GenericAreaStackChart from "./GenericAreaStackChart";
import { MintedUskStack } from "../data/Accumulated";

const BlueMarginUskChart = () => {
  const mintedUsk = MintedUskStack();

  const stakedUsk = mintedUsk.then(values => {
    const collaterals = [
      JSON.parse(JSON.stringify(values["DOT-Margin"])),
      JSON.parse(JSON.stringify(values["wETH-Margin"])),
      JSON.parse(JSON.stringify(values["wBNB-Margin"])),
      JSON.parse(JSON.stringify(values["LUNA-Margin"])),
    ];

    const sumCollateral = JSON.parse(JSON.stringify(values["ATOM-Margin"]));
    const atomLength = values["ATOM-Margin"].length;


    for (let i = 0; i <= collaterals.length -1 ; i++) {
      let AtomPosition =  atomLength - 1;

      for (let j = collaterals[i].length - 1; j >= 0; j--) {
        collaterals[i][j].value += sumCollateral[AtomPosition].value;
        sumCollateral[AtomPosition].value =collaterals[i][j].value;
        AtomPosition--;
      }
    }
    
    return sumCollateral;
  });

  return (
    <GenericAreaStackChart data={stakedUsk}>
      <div
        className="text-muted fst-italic"
        style={{ zIndex: "100" }}
      >
        USK minted in margin positions
      </div>
    </GenericAreaStackChart>
  );
};

export default BlueMarginUskChart;
