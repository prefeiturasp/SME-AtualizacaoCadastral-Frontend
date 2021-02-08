/*
*/

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { Provider } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import App from "./App";
import AppCadastro from "./AppCadastro";

import { NotificacaoContextProvider } from "./context/NotificacaoContext";
import { PalavroesContextProvider } from "./context/PalavroesContext";
import { routes, path_adm, public_routes } from "./routing/routes";
import authService from "./services/auth.service";

toast.configure();


const PublicRouter = (
  { component: Component, ...rest } // eslint-disable-line
) => <Route {...rest} render={(props) => <Component {...props} />} />;

const PrivateRouter = (
  { component: Component, tipoUsuario: tipoUsuario, ...rest } // eslint-disable-line
) => (
  <Route
    {...rest}
    render={props =>
      authService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: `/${path_adm}/login`, state: { from: props.location } }} // eslint-disable-line
        />
      )
    }
  />
);


export const CadastroProvider = ({store}) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {public_routes.map((value, key) => {
              return (
                  <PublicRouter 
                  key={key}
                  path={value.path}
                  exact={value.exact}
                  component={value.component}
                  />
                )
              })}
              {routes.map((value, key) => {
              return (
                <PrivateRouter
                      key={key}
                      path={value.path}
                      exact={value.exact}
                      component={value.component}
                    />
                  );
                })}
            <NotificacaoContextProvider>
            <PalavroesContextProvider>
                <AppCadastro />
            </PalavroesContextProvider>
            </NotificacaoContextProvider>
            <App />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
}


export const AppSwitch = ({store}) => {
    return (
            <>  
              <CadastroProvider store={store}/>
            </> 
    )
};

export default AppSwitch;