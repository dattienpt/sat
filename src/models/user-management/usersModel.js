import API from "../../http/httpClientAxios";
import {
   listUser,
   userTemplate,
   userDetail,
   getUserLoginDetail,
   clients,
   deleteclient
} from "../../http/api/requestApi";
import { postApi } from "./customRequest";
import * as localStorageService from "../../utils/localStorageService";
import { app } from "../../index";
//import { message } from "antd";

export default {
   namespace: "users",

   state: {
      users: [],
      pageNum: 0,
      pageSize: 0,
      total: 0,
      user: {},
      template: { availableRoles: [], allowedOffices: [] },
      namePage: ""
   },
   reducers: {
      save(state, { payload }) {
         state.namePage = "";
         state.users = payload.list;
         state.pageNum = payload.pageNum;
         state.pageSize = payload.pageSize;
         state.total = payload.totalNum;

         return { ...state };
      },
      userDetail(state, { payload }) {
         state.user = payload;
         state.namePage = "User detail";
         return state;
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
      }
   },
   effects: {
      *getUsers({ payload }, { call, put }) {
         const response = yield call(API.get, clients, payload);
         console.log(response);
         yield put({ type: "save", payload: response.data });
      },
      *deleteUser({ payload }, { call, put }) {
         console.log(payload);

         const response = yield call(API.delete, clients,{...payload});
         if (response.message == "Success") {
           // message.success({ content: 'delete success!', key, duration: 2 });
            yield put({
               type: "getUsers",
               payload: { pageSize: 10, pageNum: 1 }
            });
         }
      },
      *getUserDetail({ payload }, { call, put }) {
         const response = yield call(API.get, clients +"/"+ payload);
         if (response) yield put({ type: "userDetail", payload: response.data });
      },
      *getTemplate({ payload }, { call, put }) {
         const response = yield call(API.get, userTemplate);
         if (response) yield put({ type: "template", template: response });
      },
      *addUser({ payload }, { call, put }) {
         const response = yield call(postApi, [listUser, payload.data]);
         if (response.officeId)
            payload.history.replace("/user-management/user-list");
      },
      *namePage({ payload }, { put }) {
         yield put({ type: "name", namePage: payload });
      },
      *getDetailUserLogin({ payload }, { call, put }) {
         const token = {
            access_token: app._store.getState().common.token
         };
         const response = yield call(API.get, getUserLoginDetail, token);
         if (response) {
            localStorage.setItem("userId", response.userId);
            app._store.dispatch({
               type: "common/setUserId",
               payload: response.userId
            });
            app._store.dispatch({
               type: "common/setUserId",
               payload: response.userId
            });
         }
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
