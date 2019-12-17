import NetworkAxios from "../../http/httpClientAxios";
import { GET_LOAN_PRODUCTS } from '../../http/api/requestApi';
export default {
   namespace: "loanProductModel",
   state: {
      lists: []
   },

   reducers: {
      save(state, { payload: { data: lists } }) {
         return { ...state, lists };
      },
   },
   effects: {
      *getLoanProducts({ }, { call, put }) {
         const response = yield call(NetworkAxios.get, GET_LOAN_PRODUCTS);
         yield put({
            type: "save",
            payload: {
               data: response
            }
         });

      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};
