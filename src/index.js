import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
import { createHashHistory } from "history";
import modelEntry from "./models/modelEntry";
import { message } from "antd";
import "./styles/index.scss";
import "antd/dist/antd.css";
import RouterConfig from "./routers/routerConfig";

// 1. Initialize
export const app = dva({
   history: createHashHistory(),
   onError(err) {
      if (err.defaultUserMessage) {
         err.errors.map(item => message.error(item.userMessageGlobalisationCode, 10))
      } else if (err.srv) {
         message.error(err.srv.msg);
      }
      else {
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
