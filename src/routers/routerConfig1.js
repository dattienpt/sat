import React from "react";

import { Route, Router, Switch } from "react-router-dom";
import Layout from "../layouts/proLayout/mainProlayout";
import userList from "../views/user-management/userList/userList";
import createUser from "../views/user-management/create-user/editUser";


function RouterConfig({ history }) {
    return (
       <Router history={history}>
          <Switch>
             <Route path="/" exact component={LoginForm} />
             <Route path="/login" exact component={LoginForm} />
 
             <PrivateRoute path="/dashboard">
                <Layout></Layout>
             </PrivateRoute>
             <PrivateRoute path="*">
                <NotFound></NotFound>
             </PrivateRoute>
          </Switch>
       </Router>
    );
 }
 
 export default RouterConfig;
 