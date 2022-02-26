export const getAPIVersion = () => {
  const url = 'https://api.github.com/repos/prefeiturasp/SME-AtualizacaoCadastral-Backend/releases/latest';
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data.name, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const getFrontVersion = () => {
  const url = 'https://api.github.com/repos/prefeiturasp/SME-AtualizacaoCadastral-Frontend/releases/latest';
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data.name, status: status };
    })
    .catch((error) => {
      return error;
    });
};
