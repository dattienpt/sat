import API from "../../http/httpClientAxios";
import {
   userTemplate,
   clients,
   ADD_USER,
   UPDATE_USER
} from "../../http/api/requestApi";
import { app } from "../../index";
export default {
   namespace: "users",
   state: {
      users: [],
      pageNum: 0,
      pageSize: 0,
      total: 0,
      defaultCurrent: 1,
      user: {},
      template: { availableRoles: [], allowedOffices: [] },
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
      template(state, { template }) {
         template.allowedOffices = template.allowedOffices.map(item => {
            return { value: item.id + "", label: item.name };
         });
         state.namePage = "";
         return { ...state, template };
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
         if (res.code === "000000") {
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
         if (res.code === "000000") {
            history.push("/user-management/user-list");
            yield put({ type: "statusAdd", status: true });
         }
      },
      *getUsers({ payload }, { call, put }) {
         const current = payload.defaultCurrent;
         delete payload.defaultCurrent;
         const response = yield call(API.get, clients, payload);
         response.data.defaultCurrent = current;
         yield put({ type: "save", payload: response.data });
      },
      *deleteUser({ payload }, { call, put }) {
         const response = yield call(API.delete, clients + "/" + payload.id);
         if (response.message == "Success") {
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
            const response = yield call(API.get, clients + "/" + payload);
            if (response)
               yield put({ type: "userDetail", payload: response.data });
         } else {
            yield put({ type: "userDetail", payload: {} });
         }
      },
      *getTemplate({ payload }, { call, put }) {
         const response = yield call(API.get, userTemplate);
         if (response) yield put({ type: "template", template: response });
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
