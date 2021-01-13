//2. ---------------------------------------------------

//zeby nieuzywac wszyskich fetchy i zeby nie wpisywac tych
//headerow za kazdym razem , zeby nie duplikować .then((response))

//Moduł fetchAPI.js

// getMany(){
//wywołanie fetch z danym URL
// 3).   //getAll Url dla dystrictów

//}
//getOne()
// url dla pojedynczych districtów - podaje id
//Post()
//Put()
//Delete()

export const getMany = () => {
  this.fetch("http://localhost:8000/api/user/", {
    method: "get",
    headers: new Headers({
      Authorization: "Bearer " + this.props.accessToken,
      "Content-Type": "application/json",
    }),
  });
};

export const getOne = () => {
  this.fetch("http://localhost:8000/api/current-user/", {
    method: "get",
    headers: new Headers({
      Authorization: "Bearer " + this.props.accessToken,
      "Content-Type": "application/json",
    }),
  });
};

export const post = () => {};

export const put = () => {};

export const del = () => {};
