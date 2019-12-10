import API from "../../http/httpClientAxios";
import { PostRequest } from "../common/customRequest";
import { listUser,userTemplate } from "../../http/api/requestApi";

export default {
   namespace: "users",

   state: {
      users: [],
      user: {},
      template: { availableRoles: [], allowedOffices: [] }
   },
   reducers: {
      save(state, { payload }) {
         state.users = payload;
         return state;
      },
      userDetail(state, { payload }) {
         state.user = payload;
         return state;
      },
      template(state, { template }) {
         template.allowedOffices = template.allowedOffices.map(item => {
            return { value: item.id + "", label: item.name };
         });

         return { ...state, template };
      }
      // userEdit(state,{staff,editTemplate}){
      //   if(staff)  return {...state,staff:{...staff}}
      //   if(editTemplate){
      //     editTemplate.allowedOffices =  editTemplate.allowedOffices.map(item=>{return {value:item.id+"",label:item.name}});
      //     return {...state,editTemplate:{...editTemplate}}
      //   }

      // }
   },
   effects: {
      *getUsers({ payload }, { call, put }) {
         const response = yield call(API.get, listUser);
         yield put({ type: "save", payload: response });
      },
      // *getUserDetail({ payload }, { call, put }) {
      //    const response = yield call(
      //       API.get,
      //       "fineract-provider/api/v1/users/" + payload
      //    );
      //    if (response) yield put({ type: "userDetail", payload: response });
      // },
      *getTemplate({ payload }, { call, put }) {
         const response = yield call(
            API.get,
            userTemplate
         );
         if (response) yield put({ type: "template", template: response });
      },
      *addUser({ payload }, { call, put }) {
         const response = yield call(PostRequest, [
          listUser,
            payload.data
         ]);
         if (response) payload.history.replace("/user-management/user-list");
      }
      //   *updateUser({payload} , { call, put }){
      //     const response = yield call(puttAPI,['/v1/users/'+payload.id,payload.data]);
      //     if(response.changes) payload.history.push('../detail/'+payload.id)
      //   },
      //   *deleteUser({payload} , { call, put }){
      //     const response = yield call(deleteAPI,'/v1/users/'+payload.id);
      //     if(response)payload.history.push('../')
      //   },
      //   *getUserTemplate({payload} , { call, put }){
      //     const response = yield call(API.get,'/v1/users/'+payload+'?template=true');
      //     yield put({ type: 'userEdit' ,editTemplate:response});
      //   },
      //   *getStaffUser({payload} , { call, put }){
      //     const response = yield call(API.get,'/v1/staff?officeId='+payload+'&status=all')
      //     yield put({ type: 'userEdit' ,staff:response});
      // },
   },
   subscriptions: {
      save({ dispatch, history }) {}
   }
};
