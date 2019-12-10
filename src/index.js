import 'babel-polyfill';
import dva from 'dva';
import createLoading from "dva-loading";
import { createHashHistory } from "history";
import modelEntry from "./models/modelEntry";
import { message } from 'antd';
import './styles/index.less';
import "antd/dist/antd.css";
import RouterConfig from './routers/routerConfig';

// 1. Initialize
const app = dva({
  history: createHashHistory(),
  onError(error, dispatch) {
    console.log(error.error);
    
    if(error.error) message.error(error.error,20);  
    if (e.defaultUserMessage) {
      e.errors.map(item=>message.error(item.userMessageGlobalisationCode,10))
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

app.router(RouterConfig);

// 5. Start
app.start('#root');
console.log(app);