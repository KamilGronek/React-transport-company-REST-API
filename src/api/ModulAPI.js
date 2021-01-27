const BASE_URL = "http://localhost:8000/api/";
const ModulAPI = {
  get: async function (accessToken, endpoint, method) {
    return fetch(
      `${BASE_URL}${endpoint}/`,
      await makeRequest(method, accessToken)
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => console.log(error));
  },

  post: async function (accessToken, endpoint, method, json) {
    return fetch(
      `${BASE_URL}${endpoint}`,
      await makeRequest(method, accessToken, json)
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        return Promise.reject(response.json());
      }
    });
  },

  delete: async function (
    accessToken,
    endpoint,
    method,
    id,
    history,
    endpointUser
  ) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id,
      await makeRequest(method, accessToken)
    )
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("Something went wrong...");
        } else {
          return response;
        }
      })
      .then((response) => {
        history.push(endpointUser);
        return response.json();
      })
      .catch((error) => console.log(error));
  },

  getId: async function (accessToken, endpoint, method, id, endpointStatus) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id + endpointStatus,
      await makeRequest(method, accessToken)
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => console.log(error));
  },

  put: async function (accessToken, endpoint, method, id, json, endpointPut) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id + endpointPut,
      await makeRequest(method, accessToken, json)
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .catch((error) => console.log(error));
  },
};
export default ModulAPI;

async function makeRequest(method, accessToken, json) {
  const response = {
    method,
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    }),
    body: json,
  };
  return response;
}
