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
               response.data['username'] = values.username;
               response.data['timeLogin'] = Math.round(new Date().getTime() / 1000);
               localStorageService.setUserInfo(response.data);
               yield put({
                  type: "setInfoLogin",
                  username: values.username
               });
               yield put({
                  type: "loginStatus",
                  isLogin: true
               });
               app._store.dispatch({
                  type: "common/setTimeLoginSystem",
                  payload: new Date().getTime() / 1000
               });
               app._store.dispatch({
                  type: "common/setToken",
                  payload: response.data.access_token
               });

               history.push("/dashboard");
            } else {
               yield put({
                  type: "loginStatus",
                  isLogin: false
               });
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

