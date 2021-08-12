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

    const [situacao, setSituacao] = useState(0)
    const [dataCorteLote, setDataCorteLote] = useState("")
    const [dataCortePlanilha, setDataCortePlanilha] = useState("")

    const onSubmitCPF = async (value, formevent) => {
      let response = await getSituacaoCPF(value.cpf.replace(/[^0-9]/g, ""));
      setSituacao(response.data.situacao ? response.data.situacao : response.status)
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
                <div className="container">
                    <div className="conteudo">
                        <div className="col-lg-7 col-sm-12 col-xl-5">
                            <h1 class="titulo" id="conteudo">
                              Consulte os seus dados cadastrais
                            </h1>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                            <p class="subtitulo">
                              Digite o CPF do responsável pelos(as) estudante(s) cadastro(s) na Rede Municipal de Ensino, e verifique a situação do seu cadastro para realizar as medidas necessárias.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                            <p class="subtitulo-menor">
                            Caso não saiba quem está cadastrado(a) ou queria atualizar essa informação, procure a secretaria da escola em que seu(sua) filho(a) está matriculado(a). Os telefones de todas as unidades podem ser consultados no link:
                            <a href="https://escolaaberta.sme.prefeitura.sp.gov.br/" target="blank">https://escolaaberta.sme.prefeitura.sp.gov.br/</a>
                            </p>
                        </div>
                        
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                          <form
                            onSubmit={handleSubmit(onSubmitCPF)}
                            name="consultaCadastro"
                            id="consultaCadastro"
                            class="w-75 form-center"
                          >
                            <label class="label-consulta" id="cpf">Informe seu CPF</label>
                            <div className="row form-row">
                              <div className="col-lg-8" >
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

                              <div className="col-lg-4" >
                                <BtnCustomizado
                                    type="submit"
                                    classeCss="btn btn-outline-primary btn-block btn-abrir-formulario"
                                    texto="Consultar"
                                />
                              </div>
                            </div>
                            <label class="label-consulta italic">Informações atualizadas até o dia {dataCortePlanilha}</label>
                          </form>
                        </div>
                        

                        <div className="col-lg-6 col-sm-12 col-xl-5 mt-3">

                          {situacao === 1 && 
                            <div className="container-resultado cont-amarelo"> 
                              Dirija-se a DRE pertencente a sua unidade escolar com os documentos necessários para corrigir ou atualizar o seu cadastro.
                              Encontre a DRE da sua Unidade Educacional no link:
                              <br/>
                              <a href="https://escolaaberta.sme.prefeitura.sp.gov.br/" target="blank">https://escolaaberta.sme.prefeitura.sp.gov.br/</a>
                            </div>
                          }

                          {situacao === 2 && 
                            <div className="container-resultado cont-amarelo"> 
                              Dirija-se a unidade escolar com os documentos necessários para corrigir ou atualizar o seu cadastro.
                            </div>
                          }

                          {situacao === 3 && 
                            <>
                              <div className="container-resultado cont-verde"> 
                                Seu cadastro está completo, baixe o aplicativo e crie sua conta. 
                                <br/>
                                Mercado Pago:  <a href="https://youtu.be/pOTemAlTt6Q" target="blank">https://youtu.be/pOTemAlTt6Q</a>
                                <br/>
                                Blupay: <a href="https://blupay.com.br/materialescolar" target="blank">https://blupay.com.br/materialescolar</a>
                              </div>
                              <div className="texto-cadastro-completo">
                                Se você atualizou o seu cadastro após o dia {dataCorteLote}, é necessário aguardar a disponibilização do próximo lote dos benefícios pertinentes aos Programas Auxílio Uniforme e Material Escolar.
                              </div>
                            </>
                          }

                          {situacao === 404 && 
                            <div className="container-resultado cont-vermelho"> 
                              Procure sua unidade escolar.
                            </div>
                          }
                        </div>
                        
                    </div>
                </div>
            </div>

        </Fragment>
    )

}