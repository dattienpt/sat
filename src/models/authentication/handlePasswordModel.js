import NetworkAxios from "../../http/httpClientAxios";
import * as localStorageService from '../../utils/localStorageService';
import { getUserLoginDetail, changeInfoUser } from '../../http/api/requestApi';
import { app } from '../../index';
export default {
   namespace: "handlePasswordModel",
   state: {
      changed: true
   },

   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
      setStatus(state, { changed }) {
         return { ...state, changed };
      }
   },
   effects: {
      *changePassword({ payload: values, history: history }, { call, put }) {
         const userId = app._store.getState().common.userId ? app._store.getState().common.userId : localStorage.getItem("userId");
         console.log(userId, typeof userId);
         const url = `${changeInfoUser}/${userId}`;
         yield call(NetworkAxios.putAsync, url, values);
         NetworkAxios.put(url, values).then(res => {
            if (res['changes']) {
               // debugger;
               localStorageService.clearUserInfo();
               localStorage.removeItem("userId");
               history.push("/login");
               app._store.dispatch({
                  type: "loginModel/loginStatus",
                  isLogin: true
               });
               app._store.dispatch({
                  type: "handlePasswordModel/setStatus",
                  changed: true
               });
            }
         }).catch(error => {
            if (error.httpStatusCode === '400') {
               app._store.dispatch({
                  type: "handlePasswordModel/setStatus",
                  changed: false
               });
            }
         })
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};
