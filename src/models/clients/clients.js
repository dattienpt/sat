import API from "../../http/httpClientAxios";
import { clients } from "../../http/api/requestApi";
export default {
   namespace: "clients",

   state: {
       listclient:[]
   },
   reducers: {
      litst(state, {clients}) {
         return { ...state,clients };
      }
   },
   effects: {
      *clientList({ payload }, { call, put }) {
          const respons = yield call(API.get,clients+'limit='+payload.limit+'&offset='+payload.offset);
          console.log(respons);
       //  yield put({ type: "litst" ,listclient:respons});
      }
   },

   subscriptions: {
      setup({ dispatch, history }) {
         // eslint-disable-line
      }
   }
};
