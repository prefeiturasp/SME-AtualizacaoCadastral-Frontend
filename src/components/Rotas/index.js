import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Home} from "../../pages/Home";
import {Pagina404} from "../../pages/404";

export const Rotas = () => {
    return(
        <>
            <Route path="/" exact component={Home}/>
            <Route path="*" component={Pagina404}/>
        </>
    )
}