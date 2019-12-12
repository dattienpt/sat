import React from "react";
import style from "./notFound.scss";
import { withRouter } from "react-router";
import Layout from './../../layouts/proLayout/mainProlayout';
class NotFound extends React.Component {
   gotoHome = () => {
      this.props.history.push("/dashboard");
   };
   render() {
      return (
         <Layout history={this.props.history} name={'Page not found'}>
            <React.Fragment>
               <h1 className={style.h1}>404</h1>
               <p className={style.p}>Oops! Something is wrong.</p>
               <a className={style.button} onClick={() => this.gotoHome()}>
                  <i className="icon-home"></i> Go back in initial page, is better.
                  </a>
            </React.Fragment>
         </Layout>
      );
   }
}
export default withRouter(NotFound);
