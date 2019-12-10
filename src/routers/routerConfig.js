import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import LoginForm from "../views/authentication/loginForm";
import Layout from "../layouts/proLayout/mainProlayout";
import NotFound from "../views/notFound/notFound";
import { app } from "../index";
import userList from "../views/user-management/userList/userList";
import editUser from "../views/user-management/create-user/editUser";

const checkLogin = () => {
   const token = localStorage.getItem("userToken");
   if (token) {
      return true;
   }
   return false;
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ layout: Layout, children, ...rest }) => {
   // console.log(app._history);
   return (
      <Route
         {...rest}
         render={({ location }) => {
            // console.log(children);
            // console.log(location);
            return checkLogin() ? (
               children
            ) : (
                  <Redirect
                     to={{
                        pathname: "/login",
                        state: { from: location }
                     }}
                  />
               //   app._history.goBack("/login");
            );
         }}
      />
   );
};

function RouterConfig({ history }) {
   return (
      <Router history={history}>
         <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route
               path="/user-management/user-list"
               exact
               component={userList}
            />
            <Route
               path="/user-management/user-create"
               exact
               component={editUser}
            />

            <PrivateRoute path="/dashboard">
               <Layout history={history}></Layout>
            </PrivateRoute>
            <PrivateRoute path="*">
               <NotFound></NotFound>
            </PrivateRoute>
         </Switch>
      </Router>
   );
}

export default RouterConfig;
