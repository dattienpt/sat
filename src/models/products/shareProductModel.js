import API from "../../http/httpClientAxios";
import { shareProduct } from "../../http/api/requestApi";
export default {
   namespace: "share",
   state: {
    totalFilteredRecords: 0,
    pageItems:[]
   },

   reducers: {
      save(state, { payload  }) {
         return { ...payload };
      }
   },
   effects: {
      *getShare({}, { call, put }) {
         const response = yield call(API.get, shareProduct);
         if(response)  yield put({
            type: "save",
            payload: response
         });else{
            yield put({
               type: "save",
               payload: {totalFilteredRecords:0,pageItems:[]}
            });
         }
      }
   },
   subscriptions: {
   }
};
