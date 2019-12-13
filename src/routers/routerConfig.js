import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect, browserHistory } from "react-router-dom";
import LoginForm from "../views/authentication/loginForm";
import Layout from "../layouts/proLayout/mainProlayout";
import NotFound from "../views/notFound/notFound";
import userList from "../views/user-management/userList/userList";
import editUser from "../views/user-management/create-user/editUser";
import userDetail from "../views/user-management/userDetail/userDetail";
import dashboard from '../views/dashboard/dashboard';
import ClientList from "../views/clients/clientList/clientList";
import * as localStorageService from '../utils/localStorageService';


const checkLogin = () => {
   const userLocal = localStorageService.getUserInfo();
   if (userLocal) {
      return true;
   }
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

                 <Switch>
                  <Route path="/user-management/user-list" name="User list" exact={false} component={userList} />
                  <Route path="/user-management/user-detail/:userId" component={userDetail} />
                  <Route path="/dashboard" exact component={dashboard} />
                  <Route path="/user-management/user-create" component={editUser} />
                  <Route path="/clients" exact component={ClientList} />

                 </Switch>
                 </Layout>

               {/* <Dashboard history={history}></Dashboard> */}
            </PrivateRoute>
            <PrivateRoute path="*">
               <NotFound></NotFound>
            </PrivateRoute>
         </Switch>

      </Router>
   );
}

export default RouterConfig;
