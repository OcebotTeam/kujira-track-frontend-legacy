import GenericAreaStackChart from "./GenericAreaStackChart";
import { MintedUskStack } from "../data/Accumulated";

const BlueMintedUskChart = () => {
  const mintedUsk = MintedUskStack();

  const stakedUsk = mintedUsk.then(values => {
    const collaterals = [
      JSON.parse(JSON.stringify(values.whSOL)),
      JSON.parse(JSON.stringify(values.SOMM)),
      JSON.parse(JSON.stringify(values.STARS)),
      JSON.parse(JSON.stringify(values.MNTA)),
      JSON.parse(JSON.stringify(values.wstETH)),
      JSON.parse(JSON.stringify(values.LINK)),
      JSON.parse(JSON.stringify(values.INJ)),
      JSON.parse(JSON.stringify(values.wMATIC)),
      JSON.parse(JSON.stringify(values.wFTM)),
      JSON.parse(JSON.stringify(values.wAVAX)),
      JSON.parse(JSON.stringify(values.wBTC)),
      JSON.parse(JSON.stringify(values.ARB)),
      JSON.parse(JSON.stringify(values.stOSMO)),
      JSON.parse(JSON.stringify(values.stATOM)),
      JSON.parse(JSON.stringify(values.gPAXG)),
      JSON.parse(JSON.stringify(values.LUNA)),
      JSON.parse(JSON.stringify(values.wBNB)),
      JSON.parse(JSON.stringify(values.wETH)),
      JSON.parse(JSON.stringify(values.DOT)),
    ];

    const sumCollateral = JSON.parse(JSON.stringify(values.ATOM));
    const atomLength = values.ATOM.length;


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
        USK minted using collaterals
      </div>
    </GenericAreaStackChart>
  );
};

export default BlueMintedUskChart;
