import evnConfig from "../configs/env";
import Axios from "axios";
import { app } from "../index";
import { requestStatus } from "./requestConfig";
import { parseQuery } from "../utils/processData";
import * as localStorageService from '../utils/localStorageService';
import { aesPub, processRequest, processResponse } from './processEncrypt';

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
   headers: { "Content-Type": "application/json;charset=UTF-8" }
};

function addAesKeyParam(axiosInstance, aesKey) {
   axiosInstance.defaults.params['aesKey'] = aesKey || '';
}

const connectedFailed = {
   errorType: 2,
   message: {
      title: "Can not connect to server"
   }
};

let axiosInstance = Axios.create(commonReqConfig);
const timeStamp = new Date().getTime();
axiosInstance.defaults.params = {};
axiosInstance.defaults.params['timeStamp'] = timeStamp;
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
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
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
      addAesKeyParam(axiosInstance, aesPub);
      return new Promise((resolve, reject) => {
         axiosInstance
            .get(url, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
               resolve(response.data);
            })
            .catch(error => {
               if (error.response && error.response.status == 401)
                  resolve(this.checkStatus(error.response));
               else
                  reject(error.response.data);
            });
      });
   };

   static post = (url, data = {}) => {
      delete axiosInstance.defaults.params['aesKey'];
      return new Promise((resolve, reject) => {
         axiosInstance.post(url, processRequest(data), {
            headers: { Authorization: `Bearer ${this.token}` }
         })
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
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
      delete axiosInstance.defaults.params['aesKey'];
      return new Promise((resolve, reject) => {
         axiosInstance.put(url, processRequest(data), { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
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
   static delete = (url,data) => {
      console.log(data);
      // if (data) {
      //    url += `?` + parseQuery(data);
      // }
      console.log(url);
      addAesKeyParam(axiosInstance);
      return new Promise((resolve, reject) => {
         axiosInstance.delete(url, { headers: { Authorization: `Bearer ${this.token}` } }, )
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
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

   static patch = (url, data = {}) => {
      delete axiosInstance.defaults.params['aesKey'];
      return new Promise((resolve, reject) => {
         axiosInstance.patch(url, processRequest(data), { headers: { Authorization: `Bearer ${this.token}` } }, ...options)
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
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

   static postWithNoToken = (url, data = {}) => {
      delete axiosInstance.defaults.params['aesKey'];
      return new Promise((resolve, reject) => {
         axiosInstance.post(url, processRequest(data))
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
               resolve(response.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   }
   static getWithNoToken = (url, data = {}) => {
      addAesKeyParam(axiosInstance, aesPub);
      return new Promise((resolve, reject) => {
         axiosInstance.get(url, data)
            .then(response => {
               if (response.data.code == "000000") {
                  response.data.data = response.data.data && processResponse(response.data.data);
               }
               resolve(response.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   }

   static getTokenRequest = (url) => {
      const instance = Axios.create({
         baseURL: evnConfig.baseUrl.tokenHost,
         responsesType: "json",
         timeout: 30000,
         validateStatus: function (status) {
            return status >= 200 && status < 300;
         },
         headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
      return new Promise((resolve, reject) => {
         instance.get(url)
            .then(response => {
               resolve(response);
            })
            .catch(error => {
               reject(error.response.data);
            });
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
      return NetworkAxios.patch(url, data);
   },
   postWithNoToken(url, data) {
      return NetworkAxios.postWithNoToken(url, data);
   },
   getTokenRequest(url) {
      return NetworkAxios.getTokenRequest(url);
   },
   delete(url, data) {
      return NetworkAxios.delete(url, { data: processRequest(data) });
   }
};
