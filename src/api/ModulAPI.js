const BASE_URL = "http://localhost:8000/api/";

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
    )
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Something went wrong...");
        } else {
          return response.json();
        }
      })
      .catch((error) => console.log(error));
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

  getId: async function (accessToken, endpoint, method, id) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id,
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

  getStatusId: async function (accessToken, endpoint, method, id) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id + `/status`,
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

  putStatusId: async function (
    accessToken,
    endpoint,
    method,
    id,
    json,
    history
  ) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id + `/status`,
      await makeRequest(method, accessToken, json)
    )
      .then((response) => {
        if (response.ok) {
          history.push("/courier-order");
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .catch((error) => console.log(error));
  },

  putId: async function (accessToken, endpoint, method, id, json, history) {
    return fetch(
      `${BASE_URL}${endpoint}/` + id + `/edit`,
      await makeRequest(method, accessToken, json)
    )
      .then((response) => {
        if (response.ok) {
          history.push("/user");
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })

      .catch((error) => console.log(error));
  },

  putIdEdit: async function (accessToken, endpoint, method, id, json, history) {
    fetch(
      `${BASE_URL}${endpoint}/` + id + "/edit/user",
      await makeRequest(method, accessToken, json)
    )
      .then((response) => {
        if (response.ok) {
          history.push("/user-order");
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .catch((error) => console.log(error));
  },
};

export default ModulAPI;
