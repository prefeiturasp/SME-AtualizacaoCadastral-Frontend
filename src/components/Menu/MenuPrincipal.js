import React from "react";
import logoPrefeitura from "../../assets/img/header_logo.png";
import "./menu-principal.scss";

export const MenuPrincipal = () => {
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-start justify-content-center align-items-end mb-4 mb-lg-0">
          <h1 className="m-0">
            <a href="https://educacao.sme.prefeitura.sp.gov.br/">
              <img
                src={logoPrefeitura}
                alt="Prefeitura de São Paulo"
                className="img-fluid"
              />
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};
