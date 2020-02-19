import NetworkAxios from "../../http/httpClientAxios";
import { encryptPassToken } from "../../http/processEncrypt";
import { app } from "../../index";
import { parseQuery } from "../../utils/processData";
import { OauthUrl } from "../../http/api/requestApi";
import * as localStorageService from '../../utils/localStorageService';

export default {
   namespace: "loginModel",
   state: {
      isLogin: true,
      username: null
   },

   reducers: {
      setInfoLogin(state, { username }) {
         return { ...state, username };
      },
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
      loginStatus(state, { isLogin }) {
         return { ...state, isLogin };
      }
   },
   effects: {
      *checkLogin({ payload: values, history: history }, { call, put }) {
         const data = {
            username: values.username,
            password: encryptPassToken(values.password),
            client_id: "client",
            grant_type: "password",
            client_secret: "secret",
            scope: "app"
         };
         const url = OauthUrl + parseQuery(data);
         NetworkAxios.getTokenRequest(url).then(response => {
            if (response) {
               if (response.status === 200) {
                  localStorageService.setUserInfo(response.data);
                  app._store.dispatch({
                     type: "common/setToken",
                     payload: response.data.access_token
                  });
                  history.push("/dashboard");
               }
               else {
                  localStorageService.clearUserInfo();
                  localStorage.removeItem("userId");
                  location.reload();
               }
            }
         }).catch(err => {
            if (err) {
               app._store.dispatch({
                  type: "loginModel/loginStatus",
                  isLogin: false
               });
            }
         })
      },
      *refreshToken({ payload: refreshData }, { call }) {
         const data = {
            client_id: "client",
            grant_type: "refresh_token",
            client_secret: "secret",
            refresh_token: refreshData.refresh_token
         };
         const url = OauthUrl + parseQuery(data);
         const response = yield call(NetworkAxios.getTokenRequest, url);
         if (response) {
            if (response.status === 200) {
               app._store.dispatch({
                  type: "common/setToken",
                  payload: response.data.access_token
               });
               localStorageService.clearUserInfo();
               localStorageService.setUserInfo(response.data);
            }
            else {
               localStorageService.clearUserInfo();
               localStorage.removeItem("userId");
               location.reload();
            }
         }
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};

