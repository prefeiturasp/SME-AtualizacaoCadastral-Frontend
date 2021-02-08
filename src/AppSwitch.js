/*
*/

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import App from "./App";
import AppCadastro from "./AppCadastro";
import { path } from "d3-path";

import { NotificacaoContextProvider } from "./context/NotificacaoContext";
import { PalavroesContextProvider } from "./context/PalavroesContext";


toast.configure();

export const UniformeProvider = ({store}) => {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
    )
}

export const CadastroProvider = () => {
    return (
        <NotificacaoContextProvider>
        <PalavroesContextProvider>
          <BrowserRouter>
            <AppCadastro />
          </BrowserRouter>
        </PalavroesContextProvider>
      </NotificacaoContextProvider>
    )
}


export const AppSwitch = ({store}) => {
    const pathName = window.location.pathname;
    return (
            pathName.match(/\/adm-escola\/*/) ?
            (<>
                <UniformeProvider store={store}/>
            </>) 
            : <CadastroProvider />
    )
};

export default AppSwitch;