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

  const mintedUsk = MintedUskStack();

  const stakedUsk = mintedUsk.then(values => {
    const collaterals = [
      JSON.parse(JSON.stringify(values.wETH)), // 1
      JSON.parse(JSON.stringify(values.DOT)), // 2
      //values.ATOM, // 3
    ];

    const atomLength = values.ATOM.length;

    collaterals.forEach(collateral => {
      let AtomPosition = atomLength - 1;
      for (let i = collateral.length - 1; i >= 0; i--) {
        collateral[i].value +=  values.ATOM[AtomPosition].value;
        AtomPosition--;
      }
    })

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
    });
  });

  return (
    <GenericAreaStackChart data={stakedUsk}>
      <div className="position-relative">
        <div
          className="staked-kuji-legend text-white position-absolute"
          style={{ zIndex: "100" }}
        >
          <div>
            <span>{Number(currentAtomMintedUsk / 1000).toFixed(2)}K</span>{" "}
            <span className="text-muted">of 1M</span>{" "}
            <span className="fw-bold">({Number(atomPercentage).toFixed(2)}%)</span>
            <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack1}}></i> Atom</span>
            <br/>
            <span>{Number(currentDotMintedUsk / 1000).toFixed(2)}K</span>{" "}
            <span className="text-muted">of 1M</span>{" "}
            <span className="fw-bold">({Number(dotPercentage).toFixed(2)}%)</span>
            <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack2}}></i> DOT</span>
            <br/>
            <span>{Number(currentWethMintedUsk / 1000).toFixed(2)}K</span>{" "}
            <span className="text-muted">of 1M</span>{" "}
            <span className="fw-bold">({Number(wethPercentage).toFixed(2)}%)</span>
            <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack3}}></i> wETH</span>
          </div>
        </div>
      </div>
    </GenericAreaStackChart>
  );
};

export default BlueMintedUskStackChart;
