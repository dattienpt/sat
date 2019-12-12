import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import LoginForm from "../views/authentication/loginForm";
import Layout from "../layouts/proLayout/mainProlayout";
import NotFound from "../views/notFound/notFound";
import userList from "../views/user-management/userList/userList";
import editUser from "../views/user-management/create-user/editUser";
import dashboard from '../views/dashboard/dashboard';


const checkLogin = () => {
   const token = sessionStorage.getItem("userToken");
   if (token) {
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
            <Route path="/" exact component={LoginForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/dashboard" exact component={dashboard} />
            <Route path="/user-management/user-list" exact component={userList} />
            <Route path="/user-management/user-create" exact component={editUser} />
            <PrivateRoute path="*">
               <NotFound></NotFound>
            </PrivateRoute>
         </Switch>
      </Router>
   );
}

export default RouterConfig;
