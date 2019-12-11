import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
import { createHashHistory } from "history";
import modelEntry from "./models/modelEntry";
import { message } from "antd";
import "./styles/index.less";
import "antd/dist/antd.css";
import RouterConfig from "./routers/routerConfig";

// 1. Initialize
export const app = dva({
   history: createHashHistory(),
   onError(err, dispatch) {
      console.log(err);
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
app.use(createLoading());

// 3. Model
modelEntry.forEach(model => app.model(model));

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start("#root");
console.log(app);
