const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
   ? JSON.parse(sessionStorage.getItem("userInfo"))
   : {};

export default {
   namespace: "common",
   state: {
      token: userInfo["access_token"] ? userInfo["access_token"] : null,
      userId: userInfo["userId"] ? userInfo["userId"] : null,
      timeLogin: 0
   },
   reducers: {
      setToken(state, { payload: token }) {
         return { ...state, token };
      },
      clearToken(state) {
         return { ...state, token: "" };
      },
      setUserId(state, { payload: userId }) {
         return { ...state, userId };
      },
   },
   effects: {
   },
   subscriptions: {
      setup({ dispatch, history }) {
         // eslint-disable-line
      }
   }
};
