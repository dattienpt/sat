import API from "../../http/httpClientAxios";
import { clients, clientSearch } from "../../http/api/requestApi";
export default {
   namespace: "clients",

   state: {
      pageItems: [],
      totalFilteredRecords: 0
   },
   reducers: {
      litst(state, { listclient }) {
         state.pageItems = listclient.pageItems;
         state.totalFilteredRecords = listclient.totalFilteredRecords;
         return { ...state };
      },
      search(state, { listclient }) {
         state.pageItems = listclient;
         state.totalFilteredRecords = listclient.length;
         return { ...state };
      }
   },
   effects: {
      *clientList({ payload }, { call, put }) {
         const respons = yield call(
            API.get,
            clients + "limit=" + payload.limit + "&offset=" + payload.offset
         );
         yield put({ type: "litst", listclient: respons });
      },
      *searchClient({ payload }, { call, put }) {
         const respons = yield call(
            API.get,
            clientSearch + payload.key + "&resource=clients,clientIdentifiers"
         );

         const list = respons.map((item, index) => {
            return {
               displayName: item.entityName,
               accountNo: item.entityAccountNo,
               officeName: item.parentName,
               id: index,
               status: item.entityStatus,
               mobileNo: item.entityMobileNo
            };
         });
         yield put({ type: "search", listclient: list });
      }
   },

   subscriptions: {
      setup({ dispatch, history }) {
         // eslint-disable-line
      }
   }
};
