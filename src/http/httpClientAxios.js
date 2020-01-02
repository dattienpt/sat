import evnConfig from "../configs/env";
import Axios from "axios";
import { app } from "../index";
import { OauthUrl } from "./api/requestApi";
import { requestStatus } from "./requestConfig";
import { parseQuery } from "../utils/processData";
import * as localStorageService from '../utils/localStorageService';

const commonReqConfig = {
   baseURL: evnConfig.baseUrl.host,
   transfromresponses: [
      (data) => {
         return data;
      }
   ],
   responsesType: "json",
   timeout: 30000,
   validateStatus: function (status) {
      return status >= 200 && status < 300;
   },
   headers: { "Fineract-Platform-TenantId": "default", "Content-Type": "application/json;charset=UTF-8" }
};

const connectedFailed = {
   errorType: 2,
   message: {
      title: "Can not connect to server"
   }
};

const axiosInstance = Axios.create(commonReqConfig);
Axios.interceptors.request.use(config => {
   // Do something before request is sent
   return config;
});
export class NetworkAxios {

   static get token() {
      return app._store.getState().common.token;
   }
   static reload = () => {
      const _host = window.location.href;
      const urlPrefix = _host.split("#")[0];
      window.location.href = `${urlPrefix}#/login`;
   };

   static getTokenRequest = data => {
      let url = evnConfig.baseUrl.tokenHost + OauthUrl;
      url += `?` + parseQuery(data);
      return axiosInstance
         .get(url)
         .then(response => response.data)
         .catch(({ response }) => {
            if (response.status === requestStatus.expired || response.status === requestStatus.forceExpired) {
               return response;
            } else {
               return connectedFailed;
            }
         });
   };
   static checkStatus = async response => {
      if (response.status === requestStatus.expired) {
         //Access token expired
         const userLocal = localStorageService.getUserInfo();
         await app._store.dispatch({
            type: "loginModel/refreshToken",
            payload: userLocal
         });
         if (this.token) {
            return axiosInstance({
               ...response.config,
               headers: {
                  Authorization: `Bearer ${this.token}`
               }
            }).then(response => {
               return response.data;
            }).catch(error => {
               return error.response;
            })
         }
      } else if (response.status === requestStatus.forceExpired) {
         //reload Url
         this.reload();
      } else {
         return connectedFailed;
      }
   };
   static get = (url, data) => {
      if (data) {
         url += `?` + parseQuery(data);
      }
      return new Promise((resolve, reject) => {
         axiosInstance
            .get(url, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => {
               resolve(response.data);
            })
            .catch(error => {
               if (error.response.status == 401)
                  resolve(this.checkStatus(error.response));
               else
                  reject(error.response.data);
            });
      });
   };

   static getAsync = async (url, data) => {
      if (data)
         url += `?` + parseQuery(data);
      return axiosInstance.get(url, { headers: { Authorization: `Bearer ${this.token}` } })
         .then(response => {
            return response.data;
         })
         .catch(error => {
            return this.checkStatus(error.response);
         });
   }

   static delete = (url) => {
      return new Promise((resolve, reject) => {
         axiosInstanc.delete(url, { headers: { Authorization: `Bearer ${this.token}` } }, ...options)
            .then(response => {
               resolve(response.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static post = (url, data = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance.post(url, data, {
            headers: { Authorization: `Bearer ${this.token}` }
         })
            .then(response => {
               resolve(response.data);
            })
            .catch(error => {
               if (error.response.status == 401)
                  resolve(this.checkStatus(error.response));
               else
                  reject(error.response.data);
            });
      });
   };
   static put = (url, data = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance.put(url, data, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => {
               resolve(response.data);
            })
            .catch(error => {
               if (error.response.status == 401)
                  resolve(this.checkStatus(error.response));
               else
                  reject(error.response.data);
            });
      });
   };

   static putAsync = async (url, data) => {
      if (data)
         url += `?` + parseQuery(data);
      return axiosInstance.put(url, { headers: { Authorization: `Bearer ${this.token}` } })
         .then(response => {
            return response.data;
         })
         .catch(error => {
            return this.checkStatus(error.response);
         });
   }

   static patch = (url, data = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance.patch(url, data, { headers: { Authorization: `Bearer ${this.token}` } }, ...options)
            .then(response => {
               resolve(response.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static postWithNoToken = (url, data = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance.post(url, data)
            .then(response => {
               const res = {
                  data: response.data,
                  status: response.status,
                  statusText: response.statusText
               };
               resolve(res)
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   }
   static postAsyncWithNoToken = async (url, data = {}) => {
      return axiosInstance.post(url, data)
         .then(response => {
            const res = {
               data: response.data,
               status: response.status,
               statusText: response.statusText
            };
            return (res);
         })
         .catch(error => {
            return error.response;
         });
   }
}
export default {
   get(url, data) {
      return NetworkAxios.get(url, data);
   },
   post(url, data) {
      return NetworkAxios.post(url, data);
   },
   put(url, data) {
      return NetworkAxios.put(url, data);
   },
   patch(url, data) {
      return NetworkAxios.post(url, data);
   },
   delete(url, data) {
      return NetworkAxios.delete(url, data);
   },
   postWithNoToken(url, data) {
      return NetworkAxios.postWithNoToken(url, data);
   },
   getAsync(url, data) {
      return NetworkAxios.getAsync(url, data);
   },
   postAsyncWithNoToken(url, data) {
      return NetworkAxios.postAsyncWithNoToken(url, data);
   },
   putAsync(url, data) {
      return NetworkAxios.putAsync(url, data);
   }
};
