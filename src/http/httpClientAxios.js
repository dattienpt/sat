import evnConfig from "../configs/env";
import Axios from "axios";
import { app } from "../index";
import { OauthUrl } from "./api/requestApi";
import { requestStatus } from "./requestConfig";
import { parseQuery } from "../utils/processData";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import loginForm from "../views/authentication/loginForm";

const commonReqConfig = {
   baseURL: evnConfig.baseUrl.host,
   transfromRespones: [
      (data, header) => {
         return data;
      }
   ],
   responesType: "json",
   timeout: 30000,
   validateStatus: function (status) {
      return status >= 200 && status < 300;
   },
   headers: { "Fineract-Platform-TenantId": "default" }
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
      const timeLogin = Math.round(sessionStorage.getItem("timeLogin"));
      const userLocal = JSON.parse(sessionStorage.getItem("userInfo"));
      const lifeTime = timeLogin + userLocal["expires_in"];
      const timeCurrent = Math.round(new Date().getTime() / 1000);
      const now = new Date();
      const currentTime = now.getTime();
      // add seconend

      // const afterAdd = now.setSeconds(now.getSeconds() + 600);
      // const timeExp = afterAdd.getTime();

      if (true) {
         // let data = {
         //    client_id: "community-app",
         //    grant_type: "refresh_token",
         //    client_secret: 123,
         //    tenantIdentifier: "default",
         //    refresh_token: userLocal["refresh_token"]
         // };
         // let url = OauthUrl + parseQuery(data);
         // const response = this.postRefresh(url).then(res => {
         //    console.log(res);
         // });
         // redirect loginForm
      }
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
   static get = (url, data) => {
      console.log("__________get_____________", this.token);
      if (data) {
         url += `?` + parseQuery(data);
      }
      return new Promise((resolve, reject) => {
         axiosInstance
            .get(url, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(respone => {
               resolve(respone.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };

   static delete = (url, options = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance
            .delete(
               url,
               { headers: { Authorization: `Bearer ${this.token}` } },
               ...options
            )
            .then(respone => {
               resolve(respone.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static post = (url, data = {}, options = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance
            .post(url, data, {
               headers: { Authorization: `Bearer ${this.token}` }
            })
            .then(respone => {
               resolve(respone.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static put = (url, data = {}, options = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance.put(url, data, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(respone => {
               resolve(respone.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static patch = (url, data = {}, options = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance
            .patch(
               url,
               data,
               { headers: { Authorization: `Bearer ${this.token}` } },
               ...options
            )
            .then(respone => {
               resolve(respone.data);
            })
            .catch(error => {
               reject(error.response.data);
            });
      });
   };
   static postWithNoToken = (url, data = {}, options = {}) => {
      return new Promise((resolve, reject) => {
         axiosInstance
            .post(url, data)
            .then(respone => {
               const res = {
                  data: respone.data,
                  status: respone.status,
                  statusText: respone.statusText
               };
               resolve(res)
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
      return NetworkAxios.post(url, data);
   },
   delete(url, data) {
      return NetworkAxios.delete(url, data);
   },
   postWithNoToken(url, data) {
      return NetworkAxios.postWithNoToken(url, data);
   }
};
