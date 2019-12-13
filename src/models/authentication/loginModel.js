import NetworkAxios from "../../http/httpClientAxios";
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
         let data = {
            username: values.username,
            password: values.password,
            client_id: "community-app",
            grant_type: "password",
            client_secret: 123,
            tenantIdentifier: "default"
         };
         let url = OauthUrl + parseQuery(data);
         const response = yield call(NetworkAxios.postWithNoToken, url);
         if (response) {
            if (response.status === 200) {
               const now = new Date();
               now.setSeconds(now.getSeconds() + response.data.expires_in);
               response.data['username'] = values.username;
               response.data['expiresTime'] = now.getTime();
               localStorageService.setUserInfo(response.data);

               app._store.dispatch({
                  type: "common/setToken",
                  payload: response.data.access_token
               });

               history.push("/dashboard");
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

