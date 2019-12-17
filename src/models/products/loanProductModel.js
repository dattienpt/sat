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
         const { status, data } = yield call(NetworkAxios.getAsync, GET_LOAN_PRODUCTS);
         console.log(status);
         if (status === 200) {
            yield put({
               type: "save",
               payload: {
                  data: data
               }
            });
         }
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};







