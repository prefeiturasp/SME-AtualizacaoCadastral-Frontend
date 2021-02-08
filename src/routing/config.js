import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { routes, path_adm, public_routes } from "./routes";
import NotFoundPage from "../screens/404";
import authService from "../services/auth.service";


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

const Routes = () => (
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
      <Route path="*" component={NotFoundPage} />
    </Switch>
);

export default Routes;
