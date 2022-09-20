import { useState } from "react";

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
      <p className="text-center text-white">
        <div className="blue-gradient-bg d-inline-block py-1 px-2 me-2 rounded">Tips</div>
        <span id="tip-address">kujira14k3ln0t75n3uvktpan6trgzt6xlxeg2zafe2kw</span>
        <i className="bi bi-clipboard ms-2 curso" onClick={copyTipAddress} style={{ "cursor": "pointer" }}></i>
        {addressCopied && (
          <div className="blue-gradient-bg d-inline-block py-1 px-2 ms-2 rounded position-absolute">
            <i className="bi bi-heart-fill me-2"></i>
            Thanks!
          </div>
        )}
      </p>
    </footer>
  );
};

export default Footer;