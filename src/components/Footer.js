import { useState } from "react";
import {colors} from "../variables/variables";

const Footer = (props) => {

  const [addressCopied, setAddressCopied] = useState(false);

  const copyTipAddress = () => {
    var address = document.getElementById('tip-address');
    navigator.clipboard.writeText(address.textContent);
    setAddressCopied(true);
    setTimeout(() => {
      setAddressCopied(false);
    }, 2000);
  }

  return (
    <footer className="container text-white mb-5">
      <div className="text-white">
        <hr/>
      </div>
      <p className="text-muted text-center mb-5">
        We are not part of the KUJIRA Core team, all the data collected here is
        just for educational use. There is no assurance that all the numbers
        provided on this site are 100% accurate.
      </p>
      <div className="text-center text-white">
        <div className="d-inline-block py-1 px-2 me-3 rounded" style={{ background: colors.blue }}>Tips</div>
        <span id="tip-address">kujira14k3ln0t75n3uvktpan6trgzt6xlxeg2zafe2kw</span>
        <i className="bi bi-clipboard ms-3 curso" onClick={copyTipAddress} style={{ "cursor": "pointer" }}></i>
        {addressCopied && (
          <div className="blue-gradient-bg d-inline-block py-1 px-2 ms-3 rounded position-absolute">
            <i className="bi bi-heart-fill me-3"></i>
            Thanks!
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;