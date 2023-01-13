import GenericAreaStackChart from "./GenericAreaStackChart";
import {areaStackColors} from "../variables/variables";
import { MintedUskStack } from "../data/Accumulated";
import { useEffect, useState } from "react";

const BlueMintedUskStackChart = () => {
  // Atom
  const [atomPercentage, setAtomPercentage] = useState(0);
  const [currentAtomMintedUsk, setCurrentAtomMintedUsk] = useState(0);
  // Dot
  const [dotPercentage, setDotPercentage] = useState(0);
  const [currentDotMintedUsk, setCurrentDotMintedUsk] = useState(0);
  // wETH
  const [wethPercentage, setWethPercentage] = useState(0);
  const [currentWethMintedUsk, setCurrentWethMintedUsk] = useState(0);
  // wBNB
  const [wbnbPercentage, setWbnbPercentage] = useState(0);
  const [currentWbnbMintedUsk, setCurrentWbnbMintedUsk] = useState(0);

  const mintedUsk = MintedUskStack();

  const stakedUsk = mintedUsk.then(values => {
    const collaterals = [
      JSON.parse(JSON.stringify(values.wBNB)),
      JSON.parse(JSON.stringify(values.wETH)),
      JSON.parse(JSON.stringify(values.DOT)),
    ];

    const sumCollateral = JSON.parse(JSON.stringify(values.ATOM));
    const atomLength = values.ATOM.length;


    for (let i = collaterals.length - 1; i >= 0; i--) {
      let AtomPosition =  atomLength - 1;

      for (let j = collaterals[i].length - 1; j >= 0; j--) {
        collaterals[i][j].value += sumCollateral[AtomPosition].value;
        sumCollateral[AtomPosition].value =collaterals[i][j].value;
        AtomPosition--;
      }
    }

    collaterals.push(JSON.parse(JSON.stringify(values.ATOM)));

    return collaterals;
  });

  useEffect(() => {
    mintedUsk.then((values) => {
      // ATOM figures
      const currentAtomMintedUsk = values.ATOM.at(-1).value;
      setCurrentAtomMintedUsk(values.ATOM.at(-1).value);
      setAtomPercentage((currentAtomMintedUsk / 10000));
      // DOT figures
      const currentDotMintedUsk = values.DOT.at(-1).value;
      setCurrentDotMintedUsk(values.DOT.at(-1).value);
      setDotPercentage((currentDotMintedUsk / 10000));
      // wETH figures
      const currentWethMintedUsk = values.wETH.at(-1).value;
      setCurrentWethMintedUsk(values.wETH.at(-1).value);
      setWethPercentage((currentWethMintedUsk / 10000));
      // wBNB figures
      const currentWbnbMintedUsk = values.wBNB.at(-1).value;
      setCurrentWbnbMintedUsk(values.wBNB.at(-1).value);
      setWbnbPercentage((currentWbnbMintedUsk / 10000));
    });
  });

  return (
    <GenericAreaStackChart data={stakedUsk}>
      <div
        className="text-white"
        style={{ zIndex: "100" }}
      >
        {/*<span>{Number(currentAtomMintedUsk / 1000).toFixed(2)}K</span>{" "}*/}
        {/*<span className="text-muted">of 1M</span>{" "}*/}
        {/*<span className="fw-bold">({Number(atomPercentage).toFixed(2)}%)</span>*/}
        {/*<span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack1}}></i> Atom</span>*/}
        {/*<br/>*/}
        {/*<span>{Number(currentDotMintedUsk / 1000).toFixed(2)}K</span>{" "}*/}
        {/*<span className="text-muted">of 1M</span>{" "}*/}
        {/*<span className="fw-bold">({Number(dotPercentage).toFixed(2)}%)</span>*/}
        {/*<span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack2}}></i> DOT</span>*/}
        {/*<br/>*/}
        {/*<span>{Number(currentWethMintedUsk / 1000).toFixed(2)}K</span>{" "}*/}
        {/*<span className="text-muted">of 1M</span>{" "}*/}
        {/*<span className="fw-bold">({Number(wethPercentage).toFixed(2)}%)</span>*/}
        {/*<span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack3}}></i> wETH</span>*/}
        {/*<br/>*/}
        {/*<span>{Number(currentWbnbMintedUsk / 1000).toFixed(2)}K</span>{" "}*/}
        {/*<span className="text-muted">of 1M</span>{" "}*/}
        {/*<span className="fw-bold">({Number(wbnbPercentage).toFixed(2)}%)</span>*/}
        {/*<span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack4}}></i> wBNB</span>*/}

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack1}}></i> Atom </span>
          <span className="text-muted">({Number(atomPercentage).toFixed(2)}%)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack2}}></i> DOT </span>
          <span className="text-muted">({Number(dotPercentage).toFixed(2)}%)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack3}}></i> wETH </span>
          <span className="text-muted">({Number(wethPercentage).toFixed(2)}%)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack4}}></i> wBNB </span>
          <span className="text-muted">({Number(wbnbPercentage).toFixed(2)}%)</span>
        </div>

      </div>
    </GenericAreaStackChart>
  );
};

export default BlueMintedUskStackChart;
