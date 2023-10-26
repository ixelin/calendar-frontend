import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { notify } from "../helpers/notify";

//? Axios instance is created, in order to put token in Authorization header, which will be sent with every request to the server
const axiosRequest: AxiosInstance = axios.create();
axiosRequest.interceptors.request.use(
  //? there is bug related to axios config type, which i could not fix
  async (config: AxiosRequestConfig | any) => {
    const accessToken = localStorage.getItem("token");
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.data === "Access denied!!!") {
      console.log(error);
    } else if (error.response) {
      notify(`${error.response.data}`);
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
