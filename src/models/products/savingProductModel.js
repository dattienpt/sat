import API from "../../http/httpClientAxios";
import { savingProduct } from "../../http/api/requestApi";
export default {
   namespace: "saving",
   state: {
      list: []
   },

   reducers: {
      save(state, { list }) {
         return { ...state, list };
      }
   },
   effects: {
      *getSaving({}, { call, put }) {
         const response = yield call(API.get, savingProduct);
         yield put({
            type: "save",
            list: response
         });
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => {});
      }
   }
};
