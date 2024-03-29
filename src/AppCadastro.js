import React, { useState, useEffect } from "react";
import "./assets/css/styles.scss";
import { Rotas } from "./components/Rotas";
import { MenuPrincipal } from "./components/Menu/MenuPrincipal";
import { MenuAcessibilidade } from "./components/Menu/MenuAcessibilidade";
import { Rodape } from "./components/Rodape/Rodape";
import { login, getToken } from "./services/auth.cadastro.service";
import { getAPIVersion, getFrontVersion } from "./services/api.service";


export const AppCadastro = () => {
    const [alterarFonte, setAlterarFonte] = useState("");
    const [alterarContraste, setAlterarConstraste] = useState("");
    const [apiVersion, setApiVersion] = useState(null);
    const [frontVersion, setFrontVersion] = useState(null);

    const handleFonte = () => {
      setAlterarFonte(!alterarFonte);
    };

    const handleConstraste = () => {
      setAlterarConstraste(!alterarContraste);
    };

    useEffect(() => {
      if (!getToken()) {
        login();
      }
      getAPIVersion().then((response) => {
        setApiVersion(response.data);
      });
      getFrontVersion().then((response) => {
        setFrontVersion(response.data);
      });
    });

    return (
      <section
        role="main"
        className={`${alterarFonte && "fonte-maior"} ${
          alterarContraste && "alto-contraste"
        }`}
      >
        <MenuAcessibilidade
          handleFonte={handleFonte}
          handleConstraste={handleConstraste}
        />
        <MenuPrincipal />
        <Rotas />
        <Rodape versao={`${frontVersion} (API: ${apiVersion})`} />
      </section>
    );
}

export default AppCadastro;