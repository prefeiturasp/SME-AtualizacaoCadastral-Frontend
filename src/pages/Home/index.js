import React, {Fragment, useRef, useState} from "react";
import "./home.scss"
import {Login} from '../../components/Formularios/Login'
import InputMask from "react-input-mask";
import {useForm} from "react-hook-form";
import {YupSignupSchemaConsulta} from "../../utils/ValidacoesAdicionaisFormularios";
import {BtnCustomizado} from "../../components/BtnCustomizado";

export const Home = () => {

    const {register, handleSubmit, errors} = useForm({
      mode: "onBlur",
      //validationSchema: YupSignupSchemaConsulta,
    });

    const cpfRef = useRef();

    const [showStatus1, setShowStatus1] = useState(false);
    const [showStatus2, setShowStatus2] = useState(false);
    const [showStatus3, setShowStatus3] = useState(false);
    const [showStatusNaoEncontrado, setShowStatusNaoEncontrado] = useState(false);

    const onSubmitCPF = (value, formevent) => {
      console.log(value)
      console.log(formevent)
      setShowStatus1(true)
      //setShowStatus2(true)
      //setShowStatus3(true)
      //setShowStatusNaoEncontrado(true)
    };



    return (
        <Fragment>
            <div className="w-100 banner-home position-relative">
                <div className="container">
                    <div className="conteudo">
                        <div className="col-lg-7 col-sm-12 col-xl-5">
                            <h1 id="conteudo">
                              Consulte seus dados cadastrais
                            </h1>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                            <p>
                              Digite o CPF do responsável pelos(as) estudante(s) cadastro(s) na Rede Municipal de Ensino, e verifique a situação do seu cadastro para realizar as medias necessárias.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                            <span>
                            Caso não saiba quem está cadastrado(a) ou queria atualizar essa informação, procure a secretaria da escola em que seu(sua) filho(a) está matriculado(a). Os telefones de todas as unidades podem ser consultados no link:
                            <a href="https://escolaaberta.sme.prefeitura.sp.gov.br/" target="blank">https://escolaaberta.sme.prefeitura.sp.gov.br/</a>
                            </span>
                        </div>
                        
                        <div className="col-lg-6 col-sm-12 col-xl-5">
                          <form
                            onSubmit={handleSubmit(onSubmitCPF)}
                            name="consultaCadastro"
                            id="consultaCadastro"
                          >
                            <label id="cpf">Informe seu CPF</label>
                            <div className="row">
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
                              {errors.cpf && <span className="span_erro text-white mt-1">{errors.cpf.message}</span>}
                              </div>

                              <div className="col-lg-4" >
                                <BtnCustomizado
                                    type="submit"
                                    classeCss="btn btn-outline-primary btn-block btn-abrir-formulario"
                                    texto="Consultar"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        

                        <div className="col-lg-6 col-sm-12 col-xl-5 mt-3">

                          {showStatus1 && 
                            <div className="container-resultado cont-amarelo"> 
                              Dirija-se a DRE pertencente a sua unidade escolar com os documentos necessários para corrigir ou atualizar o seu cadastro.
                              Encontre a DRE da sua Unidade Educacional no link:
                              <br/>
                              <a href="https://escolaaberta.sme.prefeitura.sp.gov.br/" target="blank">https://escolaaberta.sme.prefeitura.sp.gov.br/</a>
                            </div>
                          }

                          {showStatus2 && 
                            <div className="container-resultado cont-amarelo"> 
                              Dirija-se a unidade escolar com os documentos necessários para corrigir ou atualizar o seu cadastro.
                            </div>
                          }

                          {showStatus3 && 
                            <div className="container-resultado cont-verde"> 
                              Seu cadastro está completo, baixe o aplicativo e crie sua conta. 
                              <br/>
                              Mercado Pago:  <a href="https://youtu.be/pOTemAlTt6Q" target="blank">https://youtu.be/pOTemAlTt6Q</a>
                              <br/>
                              Blupay: <a href="https://blupay.com.br/materialescolar" target="blank">https://blupay.com.br/materialescolar</a>
                            </div>
                          }

                          {showStatusNaoEncontrado && 
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