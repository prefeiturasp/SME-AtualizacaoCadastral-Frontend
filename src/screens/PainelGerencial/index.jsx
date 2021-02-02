import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { withRouter } from "react-router-dom";
import { getDadosPainelGerencial } from "../../services/painelGerencial.service";
import GraficoPizza from "../../components/GraficoPizza";
import "./style.scss";
import { formatarDados } from "./helper";
import { perfilEscola } from "../../helpers/utils";
import { FiltroEscolas } from "./componentes/FiltroEscolas";
import { toastError } from "../../components/Toast/dialogs";
import { path_adm } from "../../routing/routes";


export class PainelGerencial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollapse: false,
      dados: null,
      responseError: false,
    };
  }

  componentDidMount() {
    getDadosPainelGerencial().then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ dados: response.data.results });
      } else {
        this.setState({ responseError: true });
      }
    });
  }

  updateDadosPainelGerencial = (cod_eol_escola) => {
    getDadosPainelGerencial(cod_eol_escola).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ dados: response.data.results });
        if (response.data.results.total_alunos === 0) {
          toastError("Sem dados disponíveis");
        }
      } else {
        this.setState({ responseError: true });
      }
    });
  };

  alterCollapse = () => {
    this.setState({ openCollapse: !this.state.openCollapse });
  };

  closeCollapse = () => {
    this.setState({ openCollapse: false });
  };

  render() {
    const { dados, responseError, openCollapse } = this.state;
    return (
      <div className="panel-management">
        <Fragment>
          <div className="card">
            <div className="card-body">
              <FiltroEscolas
                openCollapse={openCollapse}
                alterCollapse={this.alterCollapse}
                updateDadosPainelGerencial={this.updateDadosPainelGerencial}
              />
              {!dados && !responseError && <div>Carregando... </div>}
              {responseError && <div>Erro ao carregar painel gerencial.</div>}
              {dados && (
                <Fragment>
                  <div className="row">
                    <div className="col-6">
                      <div className="row pt-2">
                        <div className="col-6">
                          <div className="card">
                            <div className="card-title">
                              Cadastros divergentes
                            </div>
                            <hr />
                            <div className="card-body padding-altered">
                              <div
                                onClick={() =>
                                  perfilEscola() &&
                                  this.props.history.push(
                                    `/${path_adm}/lista-alunos?status=Cadastro Divergente`
                                  )
                                }
                                className={`colored ${
                                  perfilEscola() ? "cursor" : undefined
                                } first-card`}
                              >
                                <span className="number">
                                  {dados.cadastros_divergentes}
                                </span>
                                <br />
                                <span className="bigger-label">
                                  {dados.cadastros_divergentes === 1
                                    ? "aluno"
                                    : "alunos"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default withRouter(PainelGerencial);
