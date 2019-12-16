import React ,{Suspense}from "react";
import { Route, BrowserRouter as Router, Switch, Redirect, browserHistory } from "react-router-dom";
import LoginForm from "../views/authentication/loginForm";
import Layout from "../layouts/proLayout/mainProlayout";
import NotFound from "../views/notFound/notFound";

import * as localStorageService from '../utils/localStorageService';

import { Spin } from "antd";

import { userList, editUser, userDetail, dashboard, ClientList,clientDetail,productList } from './lazyLoad';

const checkLogin = () => {
   const userLocal = localStorageService.getUserInfo();
   if (userLocal)
      return true;
   else
      return false;
};

const PrivateRoute = ({ children, ...rest }) => {
   return (
      <Route {...rest} render={({ location }) => {
         return checkLogin() ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />);
      }} />
   );
};

function RouterConfig({ history }) {
   return (
      <Router history={history}>
         <Switch>
            <Route path="/login" component={LoginForm} />
            <PrivateRoute path="/">
               <Layout history={history} >
               <Suspense fallback={<Spin />}>

                  <Switch>
                     <Route path="/user-management/user-list" name="User list" exact={false} component={userList} />
                     <Route path="/user-management/user-detail/:userId" component={userDetail} />
                     <Route path="/dashboard" exact component={dashboard} />
                     <Route path="/user-management/user-create" component={editUser} />
                     <Route path="/clients" exact component={ClientList} />
                     <Route path="/clients/:idClient" exact component={clientDetail} />
                     <Route path="/products" exact component={productList} />

                     <Route path="*" exact component={NotFound} />

                  </Switch>
                  </Suspense>
               </Layout>
            </PrivateRoute>
            {/* <PrivateRoute path="*">
               <NotFound></NotFound>
            </PrivateRoute> */}
         </Switch>
      </Router>
   );
}

export default RouterConfig;
