import React, {Fragment} from "react";
import "./home.scss"
import {Login} from '../../components/Formularios/Login'

export const Home = () => {
    return (
        <Fragment>
            <div className="w-100 banner-home position-relative">
                <div className="container">
                    <div className="conteudo">
                        <div className="col-lg-7 col-sm-12 col-xl-5">
                            <h1 id="conteudo">
                                Atualize seus dados cadastrais.
                            </h1>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                            <p>
                            Digite o Código EOL da(o) estudante e a data de nascimento dela(e), para abrir o formulário e completar os dados de cadastro da(o) responsável.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <Login/>

        </Fragment>
    )

}