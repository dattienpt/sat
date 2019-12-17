import NetworkAxios from "../../http/httpClientAxios";
import { GET_LOAN_PRODUCTS } from '../../http/api/requestApi';
export default {
   namespace: "loanProductModel",
   state: {
      lists: [],
      loading: false,
   },

   reducers: {
      save(state, { payload: { data: lists } }) {
         return { ...state, lists };
      },
      setLoadingData(state, { payload: loading }) {
         return { ...state, loading };
      },
   },
   effects: {
      *getLoanProducts({ }, { call, put }) {
         yield put({
            type: "setLoadingData",
            payload: true
         });
         const response = yield call(NetworkAxios.getAsync, GET_LOAN_PRODUCTS);
         yield put({
            type: "save",
            payload: {
               data: response
            }
         });
         yield put({
            type: "setLoadingData",
            payload: false
         });
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};







