import NetworkAxios from "../http/httpClientAxios";
import { app } from "../index";
import { Route, Router, Switch, Redirect } from "react-router-dom";

export default {
   namespace: "loginModel",
   state: {
      userInfo: localStorage.getItem("userToken")
         ? localStorage.getItem("userToken")
         : null,
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
         { call, put, take, all, select }
      ) {
         let data = {
            username: values.username,
            password: values.password,
            client_id: "community-app",
            grant_type: "password",
            client_secret: 123,
            tenantIdentifier: "default"
         };
         let url = `fineract-provider/api/oauth/token?` + parseQuery(data);
         const response = yield call(NetworkAxios.postWithNoToken, url);
         console.log(response);
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
            if (pathname === "/login") {
               const token = localStorage.getItem("userToken");
               if (token) {
                  // history.push("/dashboard");
                  // history.go("/dashboard");
                  // history.goBack("/dashboard");
                  // history.replace("/dashboard", null);
               }
            }
         });
      }
   }
};
const parseQuery = obj => {
   let str = "";
   for (const key in obj) {
      const value =
         typeof obj[key] !== "string" ? JSON.stringify(obj[key]) : obj[key];
      str += `&` + key + `=` + value;
   }
   return str.substr(1);
};
