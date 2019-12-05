export default {
  namespace: "common",
  state: {
    token: "",
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
    *setToken(action, { call, put }) {
      yield call(delay, 3000, "clear Token");
      //yield put({ type: 'clearToken' });
    },
    *clearToken(action, { put, call }) {
      yield call(delay, 3000, "refresh Token");
      yield put({ type: "setToken", payload: "token was updated" });
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      let token = new Date();
      token = token.getTime();
      dispatch({ type: "setToken", payload: token });
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
