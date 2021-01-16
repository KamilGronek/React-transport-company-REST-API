//1.FASADA: ------------------------------------

// getAllDistricts() {}
// 1). dane  , akcje

//changeUserOrder() {}

// 2).przeniesienie  wszystkich fetchy do funkcji

//getDistrictById(){}

//modifyDistrict(){}

//getUserOrders(){}

const ModulAPI = {
  get: async function (accessToken, endpoint, method) {
    return fetch(`http://localhost:8000/api/${endpoint}/`, {
      method: method,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((results) => {
        return results;
      })
      .catch((error) => console.log(error));
  },

  post: async function (accessToken, endpoint, method, json) {
    return fetch(`http://localhost:8000/api/${endpoint}`, {
      method: method,
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response;
        }
        // if (response.status === 400) {
        //   return response;
        // } else {
        //   throw new Error("Something went wrong ...");
        // }
      })
      .then((response) => response.json());

    // .catch((error) => console.log(error));
  },

  delete: async function (
    accessToken,
    endpoint,
    method,
    id,
    history,
    endpointUser
  ) {
    return fetch(`http://localhost:8000/api/${endpoint}/` + id, {
      method: method,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .then((response) => {
        history.push(endpointUser);
        return response;
      })
      .catch((error) => console.log(error));
  },

  getId: async function (accessToken, endpoint, method, id) {
    return fetch(`http://localhost:8000/api/${endpoint}/` + id, {
      method: method,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((results) => {
        return results;
      })
      .catch((error) => console.log(error));
  },

  getStatusId: async function (accessToken, endpoint, method, id) {
    return fetch(`http://localhost:8000/api/${endpoint}/` + id + `/status`, {
      method: method,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((results) => {
        return results;
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
    return fetch(`http://localhost:8000/api/${endpoint}/` + id + `/status`, {
      method: method,
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/courier-order");
          return response;
        }
        if (response.status === 400) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  },

  putId: async function (accessToken, endpoint, method, id, json, history) {
    return fetch(`http://localhost:8000/api/${endpoint}/` + id + `/edit`, {
      method: method,
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/user");
          return response;
        }
        if (response.status === 400) {
          return response.json();

          // .then((res) => {
          //   this.handleErrorForm(res);
          // });
        }
        throw new Error("Something went wrong...");
      })

      .catch((error) => console.log(error));
  },

  putIdEdit: async function (accessToken, endpoint, method, id, json, history) {
    fetch(`http://localhost:8000/api/${endpoint}/` + id + "/edit/user", {
      method: method,
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/user-order");
          return response;
        }
        if (response.status === 400) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  },
};

export default ModulAPI;
