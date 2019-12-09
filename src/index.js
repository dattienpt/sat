import 'babel-polyfill';
import dva from 'dva';
import createLoading from "dva-loading";
import { createHashHistory } from "history";
import modelEntry from "./models/modelEntry";
import RouterConfig from "./routers/routerConfig.js";
import { message } from 'antd';
import './styles/index.less';
import MainLayout from './layouts/proLayout/mainProlayout';
import "antd/dist/antd.css";

// 1. Initialize
const app = dva({
  history: createHashHistory(),
  onError(err, dispatch) {
    if (err.resp) {
      message.error(err.resp.msg);
    } else if (err.srv) {
      message.error(err.srv.msg);
    } else {
      message.error(err);
    }
  }
});

// 2. Plugins
// app.use(Loading({
//   namespace: 'loading'
//   // effects: enable effects level loading state
// }));
app.use(createLoading());

// 3. Model
modelEntry.forEach(model => app.model(model));

// 4. Router
//app.router(require('./router.jsx'));
app.router(MainLayout);

// 5. Start
app.start('#root');
console.log(app);