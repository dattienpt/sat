// import API from "../../http/httpClientAxios";
// import { clients, clientSearch, clientDetail, addUser } from "../../http/api/requestApi";
// export default {
//    namespace: "clients",

//    state: {
//       pageItems: [],
//       totalFilteredRecords: 0,
//       client: {}
//    },
//    reducers: {
//       litst(state, { listclient }) {
//          state.pageItems = listclient.pageItems;
//          state.totalFilteredRecords = listclient.totalFilteredRecords;
//          return { ...state };
//       },
//       search(state, { listclient }) {
//          state.pageItems = listclient;
//          state.totalFilteredRecords = listclient.length;
//          return { ...state };
//       },
//       client(state, { client }) {
//          return { ...state, client }
//       }
//    },
//    effects: {
//       *clientList({ payload }, { call, put }) {
//          const userDetail = {
//             acctId: 15,
//             password: "123456",
//             acctName: "dtdat23",
//             mobileNo: "0987722723237",
//             jobNum: "Admin",
//             loginFlag: "1",
//             acctStatus: "1"
//          };
//          const res = yield call(API.post, addUser, userDetail);
//          const respone = yield call(
//             API.get,
//             clients,
//             // {
//             //    limit: payload.limit,
//             //    offset: (payload.offset - 1) * payload.limit
//             // }
//          );



//          yield put({ type: "litst", listclient: respone });
//       },
//       *searchClient({ payload }, { call, put }) {
//          const respone = yield call(API.get, clientSearch + payload.key + "&resource=clients,clientIdentifiers"
//          );

//          const list = respone.map((item, index) => {
//             return {
//                displayName: item.entityName,
//                accountNo: item.entityAccountNo,
//                officeName: item.parentName,
//                id: index,
//                status: item.entityStatus,
//                mobileNo: item.entityMobileNo
//             };
//          });
//          yield put({ type: "search", listclient: list });
//       },
//       *clientDetail({ payload }, { call, put }) {
//          const respone = yield call(API.get, clientDetail + '/' + payload.id);
//          yield put({ type: "client", client: respone })
//       }
//    },

//    subscriptions: {
//       setup({ dispatch, history }) {
//          // eslint-disable-line
//       }
//    }
// };
