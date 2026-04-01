import axios from "axios";
import {API_URL} from "../environment";

if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
}

if (localStorage.getItem("auction-token")) {
  axios.defaults.headers.common["token"] = localStorage.getItem("auction-token");
}

if (localStorage.getItem("user")) {
  let user = localStorage.getItem("user");
  // console.log({user})
  // if (user)
  axios.defaults.headers.common["user"] = user
  // else
  //   axios.defaults.headers.common["user"] = ''

}

export default class HttpService {
  static setToken = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
  };
  static setAucToken = (token) => {
    axios.defaults.headers.common["auction-token"] = token;
  };
  static setUser = (user) => {
    //console.log(user)
    axios.defaults.headers.common["user"] = user;
  };

  static removeUser = () => {
    axios.defaults.headers.common["user"] = '';
  }; 

  get = (url, params) => axios.get(`${API_URL}/${url}`, {params});

  post = (url, data) => axios.post(`${API_URL}/${url}`, data);

  put = (url, data, params) => axios.put(`${API_URL}/${url}`, data, {params});

  patch = (url,  params) => axios.patch(`${API_URL}/${url}`,  params);

  delete = (url, params) => axios.delete(`${API_URL}/${url}`, {params});

  gets = (url, params) => axios.get(`${API_URL}/${url}`, {params});
}
