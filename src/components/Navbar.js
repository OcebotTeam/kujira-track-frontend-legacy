import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="KUJIRA Track" width="40" height="40" />
        </a>
        <a className="navbar-brand" href="/>">
          <span className="fw-bold">KUJIRA Track</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://twitter.com/ocebotKuji"
                target="_blank"
              >
                Twitter
              </a>
            </li>
          </ul>
          <div className="navbar-text">
            <span className="fst-italic me-2">If you find this info useful please consider to</span>
            <a
              href="https://blue.kujira.app/stake/kujiravaloper1wlduasdfr9jea5t5awulgs8tky3tdat20y02k0"
              target="_blank"
              className="btn me-2 blue-gradient-bg text-dark border border-0"
            >
              Delegate
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
