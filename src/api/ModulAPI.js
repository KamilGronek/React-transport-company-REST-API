//1.FASADA: ------------------------------------

// getAllDistricts() {}
// 1). dane  , akcje

//changeUserOrder() {}

// 2).przeniesienie  wszystkich fetchy do funkcji

//getDistrictById(){}

//modifyDistrict(){}

//getUserOrders(){}

// const ModulAPI = {
//   getAllUsers: async function () {
//     fetch("http://localhost:8000/api/user/", {
//       method: "get",
//       headers: new Headers({
//         Authorization: "Bearer " + this.accessToken,
//         "Content-Type": "application/json",
//       }),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log(response);
//           return response;
//         }
//         throw Error(response.status);
//       })
//       .then((response) => response.json())
//       .then((users) => {
//         users.reverse();

//         console.log(users);
//         this.setState({
//           users: users,
//         });
//       })
//       .catch((error) => console.log(error));
//     // this.getUserRole();
//     // this.scrollToBottom();
//   },
// };

// export default ModulAPI;

const ModulAPI = {
  getAllUsers: async function (props) {
    fetch("http://localhost:8000/api/user/", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + props.accessToken,
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
      //   .then((users) =>
      //   {
      //     users.reverse();
      //     this.setState({
      //       users: users,
      //     });
      //   })
      .catch((error) => console.log(error));
  },
};

export default ModulAPI;
