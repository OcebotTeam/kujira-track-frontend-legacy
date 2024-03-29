import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./variables/variables.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./routes/Dashboard";
import Fin from "./routes/Fin";
import Manta from "./routes/Manta";
import Footer from "./components/shared/Footer";
import CookieConsent from "react-cookie-consent";
import { colors } from "./variables/variables";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fin" element={<Fin />} />
        <Route path="/manta" element={<Manta />} />

      </Routes>{" "}

      <Footer />

      <CookieConsent
        style={{ background: colors.bgLight, borderTop: "1px solid " + colors.bgDark }}
        buttonStyle={{ color: colors.white, background: colors.blue, borderRadius: "4px" }}
      >This website uses cookies to enhance the user experience.</CookieConsent>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
