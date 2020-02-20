import API from "../../http/httpClientAxios";
import { USER_LIST, ADD_USER, UPDATE_USER } from "../../http/api/requestApi";
import { requestCode } from '../../http/requestConfig'
export default {
   namespace: "users",
   state: {
      users: [],
      pageNum: 0,
      pageSize: 0,
      total: 0,
      defaultCurrent: 1,
      user: {},
      namePage: "",
      addSuccess: null
   },
   reducers: {
      save(state, { payload }) {
         state.namePage = "";
         state.users = payload.list;
         state.pageNum = payload.pageNum;
         state.pageSize = payload.pageSize;
         state.total = payload.totalNum;
         state.defaultCurrent = payload.defaultCurrent;

         return { ...state };
      },
      userDetail(state, { payload }) {
         return { ...state, user: payload };
      },
      name(state, { namePage }) {
         state.namePage = namePage;
         return state;
      },
      statusAdd(state, { status }) {
         return { ...state, addSuccess: status };
      }
   },
   effects: {
      *addUser({ payload, history }, { call, put }) {
         const res = yield call(API.post, ADD_USER, payload);
         if (res.code === requestCode.success) {
            history.push("/user-management/user-list");
            yield put({ type: "statusAdd", status: true });
         }
      },
      *updateUser({ payload, history }, { call, put }) {
         const res = yield call(
            API.put,
            UPDATE_USER + `/${payload.acctId}`,
            payload
         );
         if (res.code === requestCode.success) {
            history.push("/user-management/user-list");
            yield put({ type: "statusAdd", status: true });
         }
      },
      *getUsers({ payload }, { call, put }) {
         const current = payload.defaultCurrent;
         delete payload.defaultCurrent;
         const response = yield call(API.get, USER_LIST, payload);
         response.data.defaultCurrent = current;
         yield put({ type: "save", payload: response.data });
      },
      *deleteUser({ payload }, { call, put }) {
         const response = yield call(API.delete, USER_LIST + "/" + payload.id);
         if (response.code == requestCode.success) {
            yield put({
               type: "getUsers",
               payload: {
                  pageSize: 10,
                  pageNum: 1,
                  defaultCurrent: payload.defaultCurrent
               }
            });
         }
      },
      *getUserDetail({ payload }, { call, put }) {
         if (payload) {
            const response = yield call(API.get, USER_LIST + "/" + payload);
            if (response)
               yield put({ type: "userDetail", payload: response.data });
         } else {
            yield put({ type: "userDetail", payload: {} });
         }
      },
      *namePage({ payload }, { put }) {
         yield put({ type: "name", namePage: payload });
      }
   },
   subscriptions: {
      setup({ dispatch, history }) {
         history.listen(ev => {
            console.log(ev);
         });
      }
   }
};
