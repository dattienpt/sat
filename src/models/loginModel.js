import NetworkAxios from "../http/httpClientAxios";
import { app } from "../index";
import { parseQuery } from "../utils/processData";
import { OauthUrl } from "../http/api/requestApi"
export default {
   namespace: "loginModel",
   state: {
      isLogin: localStorage.getItem("userToken") ? true : false
   },

   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      }
   },
   effects: {
      *checkLogin(
         { payload: values, history: history },
         { call }
      ) {
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
               localStorage.setItem("userToken", response.data.access_token);
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
         return history.listen(({ pathname, query }) => {

         });
      }
   }
};
