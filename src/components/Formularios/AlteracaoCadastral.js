/* eslint eqeqeq: 0 */
/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import HTTP_STATUS from "http-status-codes";
import InputMask from "react-input-mask";

import "./formularios.scss";
import { BtnCustomizado } from "../BtnCustomizado";
import { atualizaCadastro } from "../../services/ConectarApi";
import {
  validarDtNascResponsavel,
  validarDtNascEstudante,
  YupSignupSchemaCadastro,
} from "../../utils/ValidacoesAdicionaisFormularios";
import { NotificacaoContext } from "../../context/NotificacaoContext";
import Loading from "../../utils/Loading";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import { getError } from "../../utils/utils";
import { ModalAceitaDivergencia } from "../ModalAceitaDivergencia";

export const AlteracaoCadastral = (parametros) => {
  const nmResponsavelRef = useRef();
  let datepickerRef = useRef(null);
  const {
    collapse,
    setCollapse,
    retorno_api,
    inputCodigoEol,
    inputDtNascAluno,
    setBtnDisable,
    setInputDtNascAluno,
    codigoEolRef,
    handleBtnCancelarAtualizacao,
    formEvent,
  } = parametros;

  const mensagem = useContext(NotificacaoContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: YupSignupSchemaCadastro(),
  });

  const [loading, setLoading] = useState(false);
  const [sparErro, setSpanErro] = useState(false);
  const [dtNascResponsavel, setDtNascResponsavel] = useState(null);

  // Campos Formulário de Atualização
  const [state, setState] = useState({
    nm_responsavel: "",
    nm_responsavel_eol: "",
    cd_cpf_responsavel: "",
    cd_ddd_celular_responsavel: "",
    nr_celular_responsavel: "",
    email_responsavel: "",
    tp_pessoa_responsavel: "",
    nm_mae_responsavel: "",
    dt_nascimento_responsavel: "",
    nao_possui_celular: false,
    nao_possui_email: false,
    email_responsavel_confirm: "",
    aceita_divergencia: false,
    openModal: false,
  });

  useEffect(() => {
    let dataApi = retorno_api.detail.responsaveis[0].dt_nascimento_responsavel;
    let diaCorreto = null;

    if (dataApi) {
      diaCorreto = new Date(retorno_api.detail.responsaveis[0].dt_nascimento_responsavel);
      diaCorreto.setDate(diaCorreto.getDate() + 1);
    } else {
      diaCorreto = null;
    }
    setDtNascResponsavel(diaCorreto);
  }, [retorno_api]);

  useEffect(() => {
    setState({
      ...state,
      nm_responsavel: retorno_api.detail.responsaveis[0].nm_responsavel
        ? retorno_api.detail.responsaveis[0].nm_responsavel
            .trimEnd()
            .trimStart()
        : "",
      nm_responsavel_eol: retorno_api.detail.responsaveis[0].nm_responsavel
        ? retorno_api.detail.responsaveis[0].nm_responsavel
            .trimEnd()
            .trimStart()
        : "",
      cd_cpf_responsavel: retorno_api.detail.responsaveis[0].cd_cpf_responsavel
        ? retorno_api.detail.responsaveis[0].cd_cpf_responsavel
            .trimEnd()
            .trimStart()
        : "",
      email_responsavel: retorno_api.detail.responsaveis[0].email_responsavel
        ? retorno_api.detail.responsaveis[0].email_responsavel
            .trimEnd()
            .trimStart()
        : "",
      cd_ddd_celular_responsavel: retorno_api.detail.responsaveis[0]
        .cd_ddd_celular_responsavel
        ? retorno_api.detail.responsaveis[0].cd_ddd_celular_responsavel
            .trimEnd()
            .trimStart()
        : "",
      nr_celular_responsavel: retorno_api.detail.responsaveis[0]
        .nr_celular_responsavel
        ? retorno_api.detail.responsaveis[0].nr_celular_responsavel
            .trimEnd()
            .trimStart()
        : "",
      tp_pessoa_responsavel: retorno_api.detail.responsaveis[0]
        .tp_pessoa_responsavel
        ? String(
            parseInt(retorno_api.detail.responsaveis[0].tp_pessoa_responsavel)
          )
        : "",
      nm_mae_responsavel: retorno_api.detail.responsaveis[0].nm_mae_responsavel
        ? retorno_api.detail.responsaveis[0].nm_mae_responsavel.trimEnd().trimStart()
        : "",
      nao_possui_celular: retorno_api.detail.responsaveis[0].nao_possui_celular
        ? retorno_api.detail.responsaveis[0].nao_possui_celular
        : false,
      nao_possui_email: retorno_api.detail.responsaveis[0].nao_possui_email
        ? retorno_api.detail.responsaveis[0].nao_possui_email
        : false,
    });
  }, [retorno_api]);

  const setAceitaDivergencia = (valor) => {
    setState({
      ...state,
      aceita_divergencia: valor
    })
  }

  const handleChangeAtualizacaoCadastral = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });

    if (name === 'tp_pessoa_responsavel' && value === '4') {
      setDtNascResponsavel(new Date(moment(inputDtNascAluno)));
      setSpanErro(false);
    } else if (name === 'tp_pessoa_responsavel') {
      setDtNascResponsavel(null);
    }
  };
  
  const handleChangeDtNascResponsavel = (date) => {
    setDtNascResponsavel(date);
  };

  const handleChangeRaw = (value) => {
    const date = new Date(value.currentTarget.value);
    if (
      !moment(date).isValid() ||
      validarDtNascResponsavel(date, inputDtNascAluno)
    ) {
      setSpanErro(true);
      setDtNascResponsavel(null);
      //datepickerRef.input.focus()
    } else {
      setSpanErro(false);
    }
  };
  const handleSelect = (value) => {
    const date = new Date(value);
    if (!moment(date).isValid() || value === null || value === "") {
      setSpanErro(true);
      setDtNascResponsavel(null);
      //datepickerRef.input.focus()
    } else {
      setSpanErro(false);
    }
  };

  const handleBtnSolicitarUniforme = () => {
    return sparErro || loading;
  };

  const handleBtnCancelar = (formEvent) => {
    setState({
      ...state,
      nao_possui_celular: false,
      nao_possui_email: false,
    });
    handleBtnCancelarAtualizacao(formEvent);
  };

  const onSubmitAtualizacaoCadastral = (data, e) => {
    setLoading(true);

    // Removendo checkbox Você precisa declarar que as informações são verdadeiras
    delete data.checkboxDeclaro;
    data.aceita_divergencia = state.aceita_divergencia;
    if (data.nao_possui_celular) {
      data.cd_ddd_celular_responsavel = null;
      data.nr_celular_responsavel = null;
    } else {
      data.nr_celular_responsavel = data.nr_celular_responsavel.replace(
        / /g,
        ""
      );
    }

    data.email_responsavel = data.email_responsavel.trimEnd().trimStart();
    data.cd_cpf_responsavel = data.cd_cpf_responsavel.replace(/-/g, "");
    data.cd_cpf_responsavel = data.cd_cpf_responsavel.replace(/\./g, "");
    data.codigo_eol_aluno = String(inputCodigoEol);
    data.nm_responsavel = data.nm_responsavel.trimEnd().trimStart();
    data.nm_mae_responsavel = data.nm_mae_responsavel.trimEnd().trimStart();
    data.dt_nascimento_responsavel = validarDtNascEstudante(dtNascResponsavel);

    if (
      data.dt_nascimento_responsavel === undefined ||
      data.dt_nascimento_responsavel === "Invalid date"
    ) {
      setSpanErro(true);
      setLoading(false);
      return false;
    }

    let payload_atualizado = {
      codigo_eol: String(inputCodigoEol),
      data_nascimento: inputDtNascAluno,
      responsavel: data,
    };
    atualizaCadastro(payload_atualizado)
      .then((retorno_api) => {
        if (retorno_api.status === HTTP_STATUS.CREATED) {
          codigoEolRef.current.focus();
          mensagem.setAbrirModal(true);
          mensagem.setTituloModal("Obrigado por atualizar o seu cadastro");
          mensagem.setMsg(
            "<p>Cara(o) responsável, </p>" +
              "<p>Obrigada por fazer a atualização de seu cadastro na Secretaria Municipal de Educação.</p>" +
              "<p>Atenciosamente,</p>" +
              "<p>Secretaria Municipal de Educação <br/> Prefeitura de São Paulo</p>"
          );

          setCollapse("");
          setBtnDisable(false);
          limpaFormulario(formEvent);
          setLoading(false);
          setState({ ...state, openModal: false });
        } else {
          if (getError(retorno_api.data) === "Solicitação com inconsistência no nome.") {
            setState({
              ...state,
              aceita_divergencia: true,
              openModal: true,
            });
            setBtnDisable(false);
            setLoading(false);
          } else if (
            retorno_api.data[0] ===
            "Solicitação com inconsistência resolvida. Não pode atualizar os dados."
          ) {
            codigoEolRef.current.focus();
            mensagem.setAbrirModal(true);
            mensagem.setTituloModal("Erro ao atualizar cadastro");
            mensagem.setMsg(
              "Essa solicitação está em processo de solução de inconsistência. No momento não é possivel realizar alterações."
            );
            setCollapse("");
            setBtnDisable(false);
            e.target.reset();
            limpaFormulario(formEvent);
            setLoading(false);
          } else if (
            retorno_api.data[0] === "Solicitação enviada para o mercado pago."
          ) {
            codigoEolRef.current.focus();
            mensagem.setAbrirModal(true);
            mensagem.setTituloModal("Erro ao atualizar cadastro");
            mensagem.setMsg(
              "Essa solicitação já foi finalizada e enviada para o Mercado Pago. No momento não é possivel realizar alterações."
            );
            setCollapse("");
            setBtnDisable(false);
            e.target.reset();
            limpaFormulario(formEvent);
            setLoading(false);
          } else if (
            retorno_api.data[0] ===
            "Solicitação finalizada. Não pode atualizar os dados."
          ) {
            codigoEolRef.current.focus();
            mensagem.setAbrirModal(true);
            mensagem.setTituloModal("Erro ao atualizar cadastro");
            mensagem.setMsg(
              "Esse cadastro já foi atualizado. Caso necessite realizar alguma alteração, dirija-se a escola do aluno."
            );
            setCollapse("");
            setBtnDisable(false);
            e.target.reset();
            limpaFormulario(formEvent);
            setLoading(false);
          } else if (retorno_api.data[0] === "EOL Timeout") {
            codigoEolRef.current.focus();
            mensagem.setAbrirModal(true);
            mensagem.setTituloModal("Erro ao atualizar cadastro");
            mensagem.setMsg(
              "Tente novamente inserir o código EOL e a data de nascimento"
            );
            setCollapse("");
            setBtnDisable(false);
            e.target.reset();
            limpaFormulario(formEvent);
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        // Caso erro seta o focus no nome do responsável
        nmResponsavelRef.current.focus();
        mensagem.setAbrirModal(true);
        mensagem.setTituloModal("Erro ao atualizar cadastro");
        mensagem.setMsg("Erro ao atualizar cadastro. Tente novamente");
        console.log(error.message);
        setCollapse("show");
        setBtnDisable(true);
        setLoading(false);
      });
  };

  const limpaFormulario = () => {
    formEvent.target.reset();

    setInputDtNascAluno("");
    setState({
      ...state,
      nm_responsavel: "",
      cd_cpf_responsavel: "",
      cd_ddd_celular_responsavel: "",
      nr_celular_responsavel: "",
      email_responsavel: "",
      tp_pessoa_responsavel: "",
      nm_mae_responsavel: "",
      dt_nascimento_responsavel: "",
      codigo_escola: "",
      codigo_dre: "",
      nao_possui_celular: false,
      nao_possui_email: false,
      email_responsavel_confirm: "",
      aceita_divergencia: false,
    });
  };

  return (
    <>
      <ModalAceitaDivergencia
        showModal={state.openModal}
        closeModal={() => setState({ ...state, aceita_divergencia: false, openModal: false })}
        nome_EOL={state.nm_responsavel_eol}
        nome_fornecido={state.nm_responsavel}
        onSubmit={handleSubmit(onSubmitAtualizacaoCadastral)}
      />
      <div className={`collapse ${collapse}  pt-5`} id="">
        <h2 className="text-white mb-4">Atualização cadastral.</h2>
        <div className="container-form-dados-responsável p-4 ">
          <p className="mb-4">
            <strong>
              Responsável, confirme ou altere (se necessário) seus dados e
              complete os campos ainda não preenchidos.
            </strong>
          </p>
          <form
            name="atualizacaoCadastral"
            onSubmit={handleSubmit(onSubmitAtualizacaoCadastral)}
          >
            <div className="row">
              <div className="col-12">
                <label htmlFor="nm_responsavel">
                  <strong>
                    Nome completo do responsável (sem abreviações)*
                  </strong>
                </label>
                <input
                  ref={(e) => {
                    register(e);
                    nmResponsavelRef.current = e;
                  }}
                  defaultValue={state.nm_responsavel}
                  type="text"
                  className="form-control"
                  name="nm_responsavel"
                  id="nm_responsavel"
                  onBlur={(e) =>
                    handleChangeAtualizacaoCadastral(
                      e.target.name,
                      e.target.value.replace("_", "")
                    )
                  }
                />
                {errors.nm_responsavel && (
                  <span className="text-danger mt-1">
                    {errors.nm_responsavel.message}
                  </span>
                )}
              </div>

              <div className="col-12 col-md-8 mt-5">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="email_responsavel">
                      <strong>E-mail do responsável*</strong>
                    </label>
                    <input
                      placeholder={
                        !state.nao_possui_email ? "Digite um email válido" : ""
                      }
                      ref={(e) => {
                        register(e);
                      }}
                      value={
                        !state.nao_possui_email ? state.email_responsavel : ""
                      }
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                      className="form-control"
                      name="email_responsavel"
                      id="email_responsavel"
                      disabled={state.nao_possui_email}
                    />
                    {!state.nao_possui_email
                      ? errors.email_responsavel && (
                          <span className="text-danger mt-1">
                            {errors.email_responsavel.message}
                          </span>
                        )
                      : null}
                  </div>

                  <div className="col-12">
                    <label className="mt-3" htmlFor="email_responsavel_confirm">
                      <strong>Confirme seu email*</strong>
                    </label>

                    <input
                      placeholder={
                        !state.nao_possui_email ? "Digite um email válido" : ""
                      }
                      ref={(e) => {
                        register(e);
                      }}
                      value={
                        !state.nao_possui_email
                          ? state.email_responsavel_confirm
                          : ""
                      }
                      className="form-control"
                      name="email_responsavel_confirm"
                      id="email_responsavel_confirm"
                      disabled={state.nao_possui_email}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                    {!state.nao_possui_email
                      ? errors.email_responsavel_confirm && (
                          <span className="text-danger mt-1">
                            {errors.email_responsavel_confirm.message}
                          </span>
                        )
                      : null}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 mt-5">
                <div className="row">
                  <div className="col-12">
                    <label>
                      <strong>Telefone celular do responsável*</strong>
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="nao_possui_celular"
                        id="nao_possui_celular"
                        //value={true}
                        ref={(e) => {
                          register(e);
                        }}
                        checked={state.nao_possui_celular}
                        onChange={(e) =>
                          handleChangeAtualizacaoCadastral(
                            e.target.name,
                            e.target.checked
                          )
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="nao_possui_celular"
                      >
                        Não possuo celular
                      </label>
                    </div>
                  </div>
                  <div className="col-3">
                    <InputMask
                      mask="99"
                      maskPlaceholder={null}
                      ref={(e) => {
                        register(e);
                      }}
                      value={
                        !state.nao_possui_celular
                          ? state.cd_ddd_celular_responsavel
                          : ""
                      }
                      className="form-control"
                      name="cd_ddd_celular_responsavel"
                      id="cd_ddd_celular_responsavel"
                      disabled={state.nao_possui_celular}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value.replace("_", "")
                        )
                      }
                    />

                    {!state.nao_possui_celular
                      ? errors.cd_ddd_celular_responsavel && (
                          <span className="text-danger mt-1">
                            {errors.cd_ddd_celular_responsavel.message}
                          </span>
                        )
                      : ""}
                  </div>
                  <div className="col-9 pl-1">
                    <InputMask
                      placeholder={
                        !state.nao_possui_celular ? "Somente números" : ""
                      }
                      mask="9 9999 9999"
                      maskPlaceholder={null}
                      ref={(e) => {
                        register(e);
                      }}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value.replace("_", "")
                        )
                      }
                      value={
                        !state.nao_possui_celular
                          ? state.nr_celular_responsavel
                          : ""
                      }
                      type="tel"
                      className="form-control"
                      name="nr_celular_responsavel"
                      id="nr_celular_responsavel"
                      disabled={state.nao_possui_celular}
                    />
                    {!state.nao_possui_celular
                      ? errors.nr_celular_responsavel && (
                          <span className="text-danger mt-1">
                            {errors.nr_celular_responsavel.message}
                          </span>
                        )
                      : null}
                  </div>
                </div>
              </div>

              <div className="col-12 mt-5">
                <label>
                  <strong>Vínculo com o(a) estudante*</strong>
                </label>
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="pl-4 container-radio-2">
                    <input
                      ref={(e) => {
                        register(e);
                      }}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                      checked={state.tp_pessoa_responsavel == "1"}
                      className="form-check-input"
                      type="radio"
                      name="tp_pessoa_responsavel"
                      id="mae"
                      value={1}
                    />
                    <label className="form-check-label" htmlFor="mae">
                      <strong>Mãe</strong>
                    </label>
                  </div>

                  <div className="pl-4 container-radio-2">
                    <input
                      ref={(e) => {
                        register(e);
                      }}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                      checked={state.tp_pessoa_responsavel == "2"}
                      className="form-check-input"
                      type="radio"
                      name="tp_pessoa_responsavel"
                      id="pai"
                      value={2}
                    />
                    <label className="form-check-label" htmlFor="pai">
                      <strong>Pai</strong>
                    </label>
                  </div>
                  <div className="pl-4 container-radio-2">
                    <input
                      ref={(e) => {
                        register(e);
                      }}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                      checked={state.tp_pessoa_responsavel == "3"}
                      className="form-check-input"
                      type="radio"
                      name="tp_pessoa_responsavel"
                      id="responsaveLegal"
                      value={3}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="responsaveLegal"
                    >
                      <strong>Responsável legal</strong>
                    </label>
                  </div>

                  <div className="pl-4 container-radio-2">
                    <input
                      ref={register({ required: true })}
                      onChange={(e) =>
                        handleChangeAtualizacaoCadastral(
                          e.target.name,
                          e.target.value
                        )
                      }
                      checked={state.tp_pessoa_responsavel == "4"}
                      className="form-check-input"
                      type="radio"
                      name="tp_pessoa_responsavel"
                      id="alunoMaiorDeIdade"
                      value={4}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="alunoMaiorDeIdade"
                    >
                      <strong>Aluno maior de idade</strong>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {errors.tp_pessoa_responsavel && (
                      <span className="text-danger mt-1">
                        {errors.tp_pessoa_responsavel.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 col-md-8 mt-5">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <label htmlFor="cd_cpf_responsavel">
                          <strong>CPF do responsável*</strong>
                        </label>
                        <InputMask
                          placeholder="Somente números"
                          mask="999.999.999-99"
                          //maskPlaceholder={null}
                          ref={(e) => {
                            register(e);
                          }}
                          onChange={(e) =>
                            handleChangeAtualizacaoCadastral(
                              e.target.name,
                              e.target.value.replace("_", "")
                            )
                          }
                          value={state.cd_cpf_responsavel}
                          type="text"
                          className="form-control"
                          name="cd_cpf_responsavel"
                          id="cd_cpf_responsavel"
                        />
                        {errors.cd_cpf_responsavel && (
                          <span className="text-danger mt-1">
                            {errors.cd_cpf_responsavel.message}
                          </span>
                        )}
                      </div>
                      <div className="col-12 col-md-6 mt-5 mt-md-0">
                        <label htmlFor="dt_nascimento_responsavel">
                          <strong>Data de nascimento do responsável*</strong>
                        </label>
                        <DatePicker
                          placeholder="Somente números"
                          disabled={state.tp_pessoa_responsavel && state.tp_pessoa_responsavel === '4'}
                          required={true}
                          ref={(r) => (datepickerRef = r)}
                          selected={dtNascResponsavel}
                          className="form-control"
                          onChange={(date) =>
                            handleChangeDtNascResponsavel(date)
                          }
                          onChangeRaw={(e) => handleChangeRaw(e)}
                          onSelect={(e) => handleSelect(e)}
                          maxDate={new Date(inputDtNascAluno)}
                          minDate={new Date("1-01-1930")}
                          //onBlur={(e)=>handleBlur(e)}
                          dateFormat="dd/MM/yyyy"
                          locale="pt"
                          showYearDropdown
                          customInput={<InputMask mask="99/99/9999" />}
                        />
                        <span className="text-danger mt-1">
                          {sparErro ? "Digite uma data válida" : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <label htmlFor="nm_mae_responsavel">
                  <strong>{` ${
                    state.nm_responsavel
                      ? "Nome da mãe de " + state.nm_responsavel
                      : "Digite o nome da mãe do responsável"
                  } `}</strong>
                </label>
                <input
                  placeholder={"Escreva aqui o nome completo da mãe de " + state.nm_responsavel}
                  defaultValue={state.nm_mae_responsavel}
                  type="text"
                  className="form-control"
                  name="nm_mae_responsavel"
                  id="nm_mae_responsavel"
                  ref={(e) => {
                    register(e);
                  }}
                />
                {errors.nm_mae_responsavel && (
                  <span className="text-danger mt-1">
                    {errors.nm_mae_responsavel.message}
                  </span>
                )}
              </div>
              <div className="col-12 mt-5">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="checkboxDeclaro"
                    id="checkboxDeclaro"
                    value={true}
                    ref={(e) => {
                      register(e);
                    }}
                  />
                  <label className="form-check-label" htmlFor="checkboxDeclaro">
                    Declaro que as informações acima são verdadeiras
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {errors.checkboxDeclaro && (
                  <span className="text-danger mt-1">
                    {errors.checkboxDeclaro.message}
                  </span>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <div className="p-2">
                <BtnCustomizado
                  //onClick={() => handleBtnCancelarAtualizacao(formEvent)}
                  onClick={() => handleBtnCancelar(formEvent)}
                  disable=""
                  type="reset"
                  classeCss="btn btn-outline-primary"
                  texto="Cancelar"
                />
              </div>
              <div className="p-2">
                <BtnCustomizado
                  disable={handleBtnSolicitarUniforme()}
                  type="submit"
                  classeCss="btn btn-primary"
                  texto="Atualizar Informações"
                />
              </div>
            </div>
          </form>
          {loading ? (
            <Loading
              corGrafico="black"
              corFonte="dark"
              marginTop="0"
              marginBottom="0"
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
