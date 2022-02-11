import React, {Fragment, useRef, useState, useEffect} from "react";
import "./home.scss"
import InputMask from "react-input-mask";
import {useForm} from "react-hook-form";
import {YupSignupSchemaConsulta} from "../../utils/ValidacoesAdicionaisFormularios";
import {BtnCustomizado} from "../../components/BtnCustomizado";
import {getSituacaoCPF, getDatasCorte} from "../../services/consultaAluno.service";
import * as moment from "moment";

export const Home = () => {

    const {register, handleSubmit, errors} = useForm({
      mode: "onBlur",
      validationSchema: YupSignupSchemaConsulta,
    });

    const cpfRef = useRef();
    const resultadoRef = useRef();

    const [situacao, setSituacao] = useState(0)
    const [dataCorteLote, setDataCorteLote] = useState("")
    const [dataCortePlanilha, setDataCortePlanilha] = useState("")

    const onSubmitCPF = async (value, formevent) => {
      let response = await getSituacaoCPF(value.cpf.replace(/[^0-9]/g, ""));
      setSituacao(response.data.situacao ? response.data.situacao : response.status)
      resultadoRef.current.scrollIntoView();
    };

    useEffect(() => {
      getDatasCorte().then((res) => {
        setDataCorteLote(moment(res.data.data_corte_lote).format("DD/MM/YYYY"))
        setDataCortePlanilha(moment(res.data.data_corte_planilha).format("DD/MM/YYYY"))
      });
    })

    return (
        <Fragment>
            <div className="w-100 banner-home position-relative">
                <div className="h-100 container">
                    <div className="conteudo">
                      <div className="form" ref={resultadoRef}>
                        <div className="col-lg-6 col-sm-12 col-xl-6">
                            <h1 class="titulo" id="conteudo">
                              Uniforme e Material Escolar
                            </h1>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-6">
                            <p class="subtitulo">
                            Verifique o seu cadastro
                            </p>
                        </div>
                        
                        <div className="col-lg-6 col-sm-12 col-xl-6">
                          <form
                            onSubmit={handleSubmit(onSubmitCPF)}
                            name="consultaCadastro"
                            id="consultaCadastro"
                            class="form-consulta"
                          >
                            <label class="label-consulta" id="cpf">Informe o CPF do(a) responsável pelo(a) estudante</label>
                            <div className="row form-row">
                              <div className="col-lg-8 col-sm-12">
                                <InputMask
                                    mask="999.999.999-99"
                                    ref={e => {
                                      register(e);
                                      cpfRef.current = e;
                                    }}
                                    name="cpf"
                                    type="text"
                                    className="form-control"
                                    placeholder="000.000.000-00"
                                />
                              {errors.cpf && <span className="span_erro mt-1">{errors.cpf.message}</span>}
                              </div>

                              <div className="col-lg-4 col-sm-8 botao-form" >
                                <BtnCustomizado
                                    type="submit"
                                    classeCss="btn btn-primary btn-block btn-abrir-formulario"
                                    texto="Consultar"
                                />
                              </div>
                            </div>
                            <label class="label-consulta italic text-center">Informações atualizadas até o dia {dataCortePlanilha}</label>
                          </form>
                        </div>
                      </div>

                        <div className="col-lg-6 col-sm-12 col-xl-6 mt-3">

                          {situacao === 1 && 
                            <div className="container-resultado cont-amarelo"> 
                              <p class="titulo-resultado"><i class="fas fa-exclamation-triangle"/> Aguarde o contato da unidade escolar.</p>
                              <p class="subtitulo-resultado">Para corrigir ou atualizar o cadastro, são necessários os seguintes documentos:</p>
                              <ul>
                                <li class="texto">RG e CPF ou CNH;</li>
                                <li class="texto">Para estrangeiros: RNE ou CRNM em data vigente;</li>
                                <li class="texto">Certidão de nascimento dos(as) estudantes;</li>
                              </ul>
                            </div>
                          }

                          {situacao === 2 && 
                            <div className="container-resultado cont-amarelo"> 
                              <p class="titulo-resultado"><i class="fas fa-exclamation-triangle"/> Dirija-se a sua Unidade Escolar</p>
                              <p class="subtitulo-resultado">Para corrigir ou atualizar o seu cadastro leve os seguintes documentos:</p>
                              <ul>
                                <li class="texto">RG e CPF ou CNH;</li>
                                <li class="texto">Para estrangeiros: RNE ou CRNM em data vigente;</li>
                                <li class="texto">Certidão de nascimento dos(as) estudantes;</li>
                              </ul>
                            </div>
                          }

                          {situacao === 3 && 
                            <>
                              <div className="container-resultado cont-verde"> 
                                <p class="titulo-resultado"><i class="fas fa-check-circle"/> Seu cadastro está completo</p>

                                <p className="subtitulo-resultado">Baixe o aplicativo Kit Escolar DuePay no celular ou tablet e faça sua compra.</p>

                                <p class="texto-menor">Se você registrou o CPF de responsável no cadastro da criança após o dia {dataCorteLote}, aguarde a liberação do próximo lote.</p>
                              </div>
                            </>
                          }

                          {situacao === 404 && 
                            <div className="container-resultado cont-vermelho"> 
                              <p className="titulo-resultado mb-0"><i class="fas fa-times-circle"/> Cadastro não encontrado. Procure sua Unidade Escolar.</p> 
                            </div>
                          }
                        </div>
                        
                    </div>
                </div>
            </div>

        </Fragment>
    )

}