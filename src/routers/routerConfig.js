import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect,browserHistory  } from "react-router-dom";
import LoginForm from "../views/authentication/loginForm";
import Layout from "../layouts/proLayout/mainProlayout";
import NotFound from "../views/notFound/notFound";
import { app } from "../index";
import userList from "../views/user-management/userList/userList";
import editUser from "../views/user-management/create-user/editUser";
import userDetail from "../views/user-management/userDetail/userDetail";

const checkLogin = () => {
   const token = sessionStorage.getItem("userToken");
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
      <Router  history={history }>

             <Switch>
              <Route path="/login"  component={LoginForm} />
            
              <PrivateRoute path="/">
              <Layout history={history } >

                 <Switch>
                  <Route path="/user-management/user-list" name="User list" exact={false} component={userList} />
                  <Route path="/user-management/user-detail/:userId" component={userDetail} />

                  <Route path="/user-management/user-create" component={editUser} />
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
