import { useEffect } from "react";

const VolumesInfoBar = () => {

  useEffect(() => {

  }, []);

  return (
    <div className="blue-gradient-bg rounded p-4 container-fluid">
      <div className="row">
        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-list-ul align-text-top me-3"></i>...</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> {} </div>
        </div>

        <div className="vr p-0 text-white d-none d-lg-block"></div>
        <hr className="text-white my-4 d-block d-lg-none" style={{ boxSizing: "border-box"}}/>

        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-graph-up-arrow align-text-top me-3"></i>...</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> {} </div>
        </div>

        <div className="vr p-0 text-white d-none d-lg-block"></div>
        <hr className="text-white my-4 d-block d-lg-none" style={{ boxSizing: "border-box"}} />

        <div className="col text-white fs-5 fw-bold px-4 text-lg-center text-xxl-start">
          <span className="d-inline d-lg-block d-xxl-inline"><i className="bi bi-lock align-text-top me-3"></i>...</span>
          <div className="float-end float-lg-none float-xxl-end fw-light text-dark"> {} </div>
        </div>
      </div>
    </div>
  );
};

export default VolumesInfoBar;
