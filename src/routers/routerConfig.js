import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Index from "../views/index";
import Page01 from "../views/page01";
import Page02 from "../views/page02";
import Page03 from "../views/page03";
import AntLayout from "../layouts/ant-theme/ant-layout";
import LoginForm from "../views/login/loginForm";
function RouterConfig({ history }) {
   return (
      <Router history={history}>
         <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/layout" exact component={AntLayout} />
            <Route path="/page01" exact component={Page01} />
            <Route path="/page02" exact component={Page02} />
            <Route path="/page03" exact component={Page03} />
         </Switch>
      </Router>
   );
}
export default RouterConfig;
