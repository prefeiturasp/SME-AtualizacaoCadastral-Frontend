import PainelGerencialPage from "../pages/PainelGerencialPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";
import ResponsaveisComInconsistenciaPage from "../pages/ResponsaveisComInconsistenciaPage";
import RecuperarSenha from "../screens/RecuperarSenha";
import ConfirmarEmail from "../screens/ConfirmarEmail";
import Login from "../screens/Login";

export const path_adm = 'adm-escola';

export const routes = [
  {
    path: `/${path_adm}/`,
    component: PainelGerencialPage,
    exact: true,
  },
  {
    path: `/${path_adm}/lista-alunos`,
    component: ListaAlunosPage,
    exact: true,
  },
  {
    path: `/${path_adm}/inconsistencias-mp`,
    component: ResponsaveisComInconsistenciaPage,
    exact: true,
  },
];


export const public_routes = [
  {
    path: `/${path_adm}/confirmar-email`,
    component: ConfirmarEmail,
    exact: false,
  },
  {
    path: `/${path_adm}/recuperar-senha`,
    component: RecuperarSenha,
    exact: false,
  },
  {
    path: `/${path_adm}/login`,
    component: Login,
    exact: true,
  },
]
