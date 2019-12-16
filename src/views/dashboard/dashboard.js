import React, { Component } from "react";
import dashboard from "IMAGE/dashboard.jpg";
import style from "./dashboard.scss";
class Dashboard extends Component {

    render() {
        return (
            <div>
                <img src={dashboard} className={style.image} />
            </div>
        );
    }
}

export default Dashboard;
