export default {
   namespace: "handlePasswordModel",
   state: {
      changed: true
   },

   reducers: {
   },
   effects: {
   },
   subscriptions: {
      setup({ dispatch, history }) {
         return history.listen(({ pathname, query }) => { });
      }
   }
};
