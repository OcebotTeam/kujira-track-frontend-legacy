import { useState } from "react";

const Footer = () => {

  const [addressCopied, setAddressCopied] = useState(false);

  const copyTipAddress = () => {
    const address = document.getElementById('tip-address');
    navigator.clipboard.writeText(address.textContent).then(() => {
      setAddressCopied(true);
      setTimeout(() => {
        setAddressCopied(false);
      }, 2000);
    });
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
        <div className="d-inline-block py-1 px-2 mb-2 mb-md-0 me-md-3 rounded text-dark blue-gradient-bg">Tips</div>
        <span className="d-block d-md-inline mb-2 mb-md-0" id="tip-address">kujira14k3ln0t75n3uvktpan6trgzt6xlxeg2zafe2kw</span>
        <i className="bi bi-clipboard ms-md-3" onClick={copyTipAddress} style={{ "cursor": "pointer" }}></i>
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