const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
   ? JSON.parse(sessionStorage.getItem("userInfo"))
   : {};

export default {
   namespace: "common",
   state: {
      token: userInfo["access_token"] ? userInfo["access_token"] : null,
      userInfo: {
         username: "",
         userId: 0
      },
      timeLogin: 0
   },
   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
      clearToken(state) {
         console.warn("token has been remove");
         return { ...state, token: "" };
      }
   },
   effects: {
   },
   subscriptions: {
      setup({ dispatch, history }) {
         // eslint-disable-line
      }
   }
};
