import axios from "axios";
import {
  GENERIC_ERROR_MESSAGE,
  SERVER_AUTH_ERROR_STATUS_CODE,
  SERVER_VALIDATION_STATUS_CODE,
} from "../utils/constants.js";
import LocalstorageService from "../utils/helpers/localstorage-services.js";
import { IN_URL } from "../BaseUrl.js";

//--url for the api--
const API_URL = IN_URL;
// const API_URL = 'https://dummyjson.com';
///---------------create axios----------------------
const axiosApi = axios.create({
    baseURL: API_URL,
    // withCredentials: true,
  });
//----request------------------------------------------------------------------
axiosApi.interceptors.request.use(
    (config) => {
      const token = LocalstorageService.getLoggedInUserToken();
      // config.headers["System-Key"] = "demo";
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
//----response-----------------------------------------------------------------
  // axiosApi.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const { data, status } = error.response;
  //     if (status === SERVER_AUTH_ERROR_STATUS_CODE) {
  //       LocalstorageService.logoutUser();
  //       // window.location.replace(ROUTE_URLS.LOGIN);
  //     }
  //     if (status === SERVER_VALIDATION_STATUS_CODE) {
  //       const { error } = data;
  //       const errorsArray = [];
  //       for (const key in error) {
  //         if (Object.hasOwnProperty.call(error, key)) {
  //           const _error = error[key];
  //           errorsArray.push(_error);
  //         }
  //       }
  //       return Promise.reject(errorsArray);
  //     }
  //     return Promise.reject(GENERIC_ERROR_MESSAGE);
  //   }
  // );

//-------------------------axios functions-------------------------------------

  export async function get(url, config = {}) {
    return await axiosApi.get(url, { ...config });
  }
  
  export async function post(url, data, config = {}) {
    return axiosApi.post(url, { ...data }, { ...config });
  }
  
  export async function put(url, data, config = {}) {
    return axiosApi.put(url, { ...data }, { ...config });
  }
  
  export async function del(url, config = {}) {
    return await axiosApi.delete(url, { ...config });
  }
  
  export async function delPayload(url, data = {}, config = {}) {
    return await axiosApi.delete(url, {
      Authorization: { ...config },
      data: { ...data },
    });
  }
  
  export async function postFormData(url, data, config = {}) {
    return axiosApi.post(url, data, {
      "Content-Type": "multipart/form-data",
      ...config,
    });
  }
  
  export async function putFormData(url, data, config = {}) {
    return axiosApi.put(url, data, {
      "Content-Type": "multipart/form-data",
      ...config,
    });
  }
  
  export async function getPdf(url, responseType = "blob", config = {}) {
    return axiosApi.get(url, { ...config, responseType });
  }
  
  export async function postPdf(
    url,
    responseType = "application/pdf",
    config = {},
    data
  ) {
    return axiosApi.post(
      url,
      responseType,
      {
        ...config,
      },
      data
    );
  }
  
  export async function postExel(
    url,
    responseType = "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    config = {},
    data
  ) {
    return axiosApi.post(url, responseType, { ...config }, { ...data });
  }
  
  