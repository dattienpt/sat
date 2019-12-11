import evnConfig from "../configs/env";
import Axios from "axios";
import { app } from "../index";
import { OauthUrl } from "./api/requestApi";
import { requestStatus } from "./requestConfig";
import { parseQuery } from "../utils/processData";

const commonReqConfig = {
    baseURL: evnConfig.baseUrl.host,
    transfromRespones: [(data, header) => { return data; }],
    responesType: 'json',
    timeout: 30000,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
    headers:{'Fineract-Platform-TenantId':'default'}

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
   console.log(config);
   debugger;
   return config;
});

export class NetworkAxios {
   static get token() {
      // handding refresh

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
         .then(respone => respone.data)
         .catch(({ respone }) => {
            if (respone.status === 400 || respone.status === 401) {
               return respone;
            } else {
               return {
                  data: {
                     message:
                        "Sorry, the system is unstable, please try again later",
                     code: ""
                  }
               };
            }
         });
   };
   static checkStatus = async respone => {
      if (respone.status === requestStatus.expired) {
         await app._store.dispatch({
            type: "common/getToken",
            payload: "refresh"
         });
         if (this.token) {
            return axiosInstance({
               ...respone.config,
               headers: {
                  Authorization: `Bearer ${this.token}`
               }
            });
         } else {
            //reload
         }
      } else if (respone.status === requestStatus.forceExpired) {
         //reload Url
      } else {
         return {
            data: {
               message: "Sorry, the system is unstable, please try again later",
               code: 2
            }
         };
      }
   };
   static get = async (url, data) => {
      if (data) {
         url += `?` + parseQuery(data);
      } else {
         //exception
      }
      return axiosInstance
         .get(url, { headers: { Authorization: `Bearer ${this.token}` } })
         .then(respone => {
            return respone.data;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };


   static delete = async (url, options = {}) => {
      return axiosInstance
         .delete(
            url,
            { headers: { Authorization: `Bearer ${this.token}` } },
            ...options
         )
         .then(respone => {
            return respone.data;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };
   static post = (url, data = {}, options = {}) => {
      return axiosInstance
         .post(
            url,
            data,
            { headers: { Authorization: `Bearer ${this.token}` } },
            ...options
         )
         .then(respone => {
            return respone.data;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };
   static put = async (url, data = {}, options = {}) => {
      return axiosInstance
         .put(
            url,
            data,
            { headers: { Authorization: `Bearer ${this.token}` } },
            ...options
         )
         .then(respone => {
            return respone.data;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };
   static patch = async (url, data = {}, options = {}) => {
      return axiosInstance
         .patch(
            url,
            data,
            { headers: { Authorization: `Bearer ${this.token}` } },
            ...options
         )
         .then(respone => {
            return respone.data;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };
   static postWithNoToken = (url, data = {}, options = {}) => {
      return axiosInstance
         .post(url, data)
         .then(respone => {
            const res = {
               data: respone.data,
               status: respone.status,
               statusText: respone.statusText
            };
            return res;
         })
         .catch(respone => {
            if (respone) return this.checkStatus(respone);
            else return respone;
         });
   };
}
export default {
   get(url, data) {
      return NetworkAxios.get(url, data);
   },
   post(url, data) {
      return NetworkAxios.post(url, data);
   },
   put(url, data) {
      return NetworkAxios.post(url, data);
   },
   patch(url, data) {
      return NetworkAxios.post(url, data);
   },
   delete(url, data) {
      return NetworkAxios.delete(url, data);
   },
   async postWithNoToken(url, data) {
      return await NetworkAxios.postWithNoToken(url, data);
   }
};
