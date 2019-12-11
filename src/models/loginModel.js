import NetworkAxios from "../http/httpClientAxios";
import { app } from "../index";
import { parseQuery } from "../utils/processData";
import { OauthUrl } from "../http/api/requestApi";
export default {
   namespace: "loginModel",
   state: {
      isLogin: sessionStorage.getItem("userToken") ? false : true
   },

   reducers: {
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
               sessionStorage.setItem("userToken", response.data.access_token);
               yield put({
                  type: "loginStatus",
                  isLogin: true
               });
               app._store.dispatch({
                  type: "common/setToken",
                  payload: response.data.access_token
               });
               history.push("/dashboard");
            }
         }
         if (response.data.message) {
            yield put({
               type: "loginStatus",
               isLogin: false
            });
         }
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => {});
      }
   }
};
