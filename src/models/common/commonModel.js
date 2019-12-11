export default {
   namespace: "common",
   state: {
      token: sessionStorage.getItem("userToken")
         ? sessionStorage.getItem("userToken")
         : null,
      userInfo: {
         username: "",
         userId: 0
      }
   },
   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
      renewToken(state, { payload: token }) {
         return { ...state, token };
      },
      clearToken(state) {
         // eslint-disable-next-line no-console
         console.warn("token has been remove");
         return { ...state, token: "" };
      }
   },
   effects: {
      *setToken(action, { call, put }) {},
      *clearToken(action, { put, call }) {}
   },

   subscriptions: {
      setup({ dispatch, history }) {
         // eslint-disable-line
      }
   }
};
function delay(timeout, method) {
   return new Promise(resolve => {
      // eslint-disable-next-line no-console
      console.log("waiting.....", method);
      setTimeout(resolve, timeout);
   });
}
