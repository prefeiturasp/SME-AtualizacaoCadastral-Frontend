import { API_URL } from "../config";

export const getSituacaoCPF = getParams => {
  const url = `${API_URL}/base-cadastros/${getParams}`;
  let status = 0;
  return fetch(url, {
    method: "GET",
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};

export const getDatasCorte = () => {
  const url = `${API_URL}/datas-corte/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
  })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(data => {
      return { data: data, status: status };
    })
    .catch(error => {
      return error;
    });
};
