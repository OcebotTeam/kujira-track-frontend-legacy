import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="KUJIRA Track" width="40" height="40" />
        </Link>
        <Link className="navbar-brand" to="/">
          <span className="fw-bold">
            KUJIRA <span className="fw-light">Track</span>
          </span>
        </Link>
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
          <ul className="navbar-nav ms-lg-4 me-auto">
            <li className="nav-item text-center text-lg-start">
              <Link className="nav-link active" aria-current="page" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/volumes"
              >
                Volumes
              </Link>
            </li>
            <li className="nav-item text-center text-lg-start">
              <a
                className="nav-link"
                href="https://twitter.com/ocebotKuji"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
          <div className="navbar-text text-center text-lg-start">
            <span className="fst-italic d-none d-xl-inline">
              If you find this info useful please consider to
            </span>
            <a
              href="https://blue.kujira.app/stake/kujiravaloper1wlduasdfr9jea5t5awulgs8tky3tdat20y02k0"
              target="_blank"
              className="btn ms-xl-2 me-lg-2 blue-gradient-bg text-dark border border-0"
              rel="noreferrer"
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
