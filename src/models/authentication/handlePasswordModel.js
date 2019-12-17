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
         const userLocal = localStorageService.getUserInfo();
         const data = {
            access_token: userLocal['access_token']
         }
         NetworkAxios.get(getUserLoginDetail, data).then(res => {
            const url = `${changeInfoUser}/${res['userId']}`;
            NetworkAxios.put(url, values).then(res => {
               if (res['changes']) {
                  localStorageService.clearUserInfo();
                  history.push("/dashboard");

               }
            }).catch(error => {
               if (error.httpStatusCode === '400') {
                  app._store.dispatch({
                     type: "handlePasswordModel/setStatus",
                     changed: false
                  });
               }
            })
         })

      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};
