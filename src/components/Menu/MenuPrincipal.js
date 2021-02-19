import React from "react";
import logoEducacaoSP from "../../assets/img/educacao_sp.png";
import "./menu-principal.scss";

export const MenuPrincipal = () => {
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-start justify-content-center align-items-end mb-4 mb-lg-0">
          <h1 className="m-0">
            <a href="https://educacao.sme.prefeitura.sp.gov.br/">
              <img
                src={logoEducacaoSP}
                alt="Escola Aberta"
                className="img-fluid"
              />
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};
