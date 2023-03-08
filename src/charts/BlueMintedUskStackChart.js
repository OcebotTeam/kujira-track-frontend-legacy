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
  // LUNA
  const [lunaPercentage, setLunaPercentage] = useState(0);
  const [currentLunabMintedUsk, setCurrentLunaMintedUsk] = useState(0);
  // gPAXG
  const [gPaxgPercentage, setGpaxgPercentage] = useState(0);
  const [currentGpaxgMintedUsk, setCurrentGpaxgMintedUsk] = useState(0);
  // stATOM
  const [stATOMPercentage, setStATOMPercentage] = useState(0);
  const [currentStATOMMintedUsk, setCurrentStATOMMintedUsk] = useState(0);

  const mintedUsk = MintedUskStack();

  const stakedUsk = mintedUsk.then(values => {
    const collaterals = [
      JSON.parse(JSON.stringify(values.stATOM)),
      JSON.parse(JSON.stringify(values.gPAXG)),
      JSON.parse(JSON.stringify(values.LUNA)),
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
      setCurrentAtomMintedUsk(values.ATOM.at(-1).value);
      setAtomPercentage((currentAtomMintedUsk / 10000));
      // DOT figures
      setCurrentDotMintedUsk(values.DOT.at(-1).value);
      setDotPercentage((currentDotMintedUsk / 10000));
      // wETH figures
      setCurrentWethMintedUsk(values.wETH.at(-1).value);
      setWethPercentage((currentWethMintedUsk / 10000));
      // wBNB figures
      setCurrentWbnbMintedUsk(values.wBNB.at(-1).value);
      setWbnbPercentage((currentWbnbMintedUsk / 10000));
      // LUNA figures
      setCurrentLunaMintedUsk(values.LUNA.at(-1).value);
      setLunaPercentage((currentLunabMintedUsk / 3000)); // 300k supply
      // gPAXG figures
      setCurrentGpaxgMintedUsk(values.gPAXG.at(-1).value);
      setGpaxgPercentage((currentGpaxgMintedUsk / 10000));
      // stATOM figures
      setCurrentStATOMMintedUsk(values.stATOM.at(-1).value);
      setStATOMPercentage((currentStATOMMintedUsk / 10000));
    });
  });

  return (
    <GenericAreaStackChart data={stakedUsk}>
      <div
        className="text-white text-center"
        style={{ zIndex: "100" }}
      >

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack1}}></i> Atom </span>
          <span className="text-muted">({Number(currentAtomMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack2}}></i> DOT </span>
          <span className="text-muted">({Number(currentDotMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack3}}></i> wETH </span>
          <span className="text-muted">({Number(currentWethMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack4}}></i> wBNB </span>
          <span className="text-muted">({Number(currentWbnbMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack5}}></i> LUNA </span>
          <span className="text-muted">({Number(currentLunabMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack6}}></i> gPAXG </span>
          <span className="text-muted">({Number(currentGpaxgMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

        <div className="d-inline-block">
          <span className="ms-2"><i className="bi bi-circle-fill" style={{ color: areaStackColors.stack7}}></i> stATOM </span>
          <span className="text-muted">({Number(currentStATOMMintedUsk / 1000).toFixed(2)}K)</span>
        </div>

      </div>
    </GenericAreaStackChart>
  );
};

export default BlueMintedUskStackChart;
