import PainelGerencialPage from "../pages/PainelGerencialPage";
import ListaAlunosPage from "../pages/ListaAlunosPage";
import ResponsaveisComInconsistenciaPage from "../pages/ResponsaveisComInconsistenciaPage";

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
