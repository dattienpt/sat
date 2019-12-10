import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Layout from "../layouts/proLayout/mainProlayout";
import userList from "../views/user-management/userList/userList";
import createUser from "../views/user-management/create-user/editUser";
// import Index from '../views/index';
// import Page01 from '../views/page01';
// import Page02 from '../views/page02';
// import Page03 from '../views/page03';
function RouterConfig({ history }) {
  return (
    <Layout>
    <Router history={history}>
      <Switch>
        <Route path="/user-management/user-list" exact component={userList} />
        <Route path="/user-management/user-create" exact component={createUser} />
  
      </Switch>
    </Router>
    </Layout>
  );
}
export default RouterConfig;
