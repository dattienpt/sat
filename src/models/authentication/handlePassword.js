import NetworkAxios from "../../http/httpClientAxios";
import * as localStorageService from '../../utils/localStorageService';

export default {
   namespace: "handlePassword",
   state: {

   },

   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
   },
   effects: {
      *changePassword({ payload: values, history: history }, { call, put }) {
         const userLocal = localStorageService.getUserInfo();
         const data = {
            access_token: userLocal['access_token']
         }
         NetworkAxios.get('v1/userdetails', data).then(res => {
            const url = `v1/users/${res['userId']}`;
            NetworkAxios.put(url, values).then(res => {
               if (res['changes']) {
                  localStorageService.clearUserInfo();
                  history.push("/dashboard");
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
