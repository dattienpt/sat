import React, { Component } from "react";
import { connect } from "dva";
import Layout from './../../layouts/proLayout/mainProlayout';
import dashboard from "IMAGE/dashboard.jpg";
import style from "./dashboard.scss";
class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Layout history={this.props.history} name={'Dashboard'}>
                <div>
                    <img src={dashboard} className={style.image} />
                </div>
            </Layout>
        );
    }
}
function mapStateToPrors(state) {
    return { ...state };
}
export default connect(mapStateToPrors)(Dashboard);
