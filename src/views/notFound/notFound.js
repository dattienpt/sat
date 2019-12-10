import React from "react";
import "./notFound.less";
import { withRouter } from "react-router";
class NotFound extends React.Component {
   gotoHome = () => {
      this.props.history.push("/dashboard");
   };
   render() {
      return (
         <React.Fragment>
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <a className="button" onClick={() => this.gotoHome()}>
               <i className="icon-home"></i> Go back in initial page, is better.
            </a>
         </React.Fragment>
      );
   }
}
export default withRouter(NotFound);
