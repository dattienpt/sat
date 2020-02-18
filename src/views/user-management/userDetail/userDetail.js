import React, { Component } from 'react';
import { connect } from 'dva';
import style from './userDetail.scss';
import { Button, Modal, Icon, Spin } from 'antd';
import { formatDateMMDDYYYY } from '../../../utils/formatDate';

class UserDetail extends Component {
  state = { visible: false, isLoading: true }

  componentWillReceiveProps(ev) {
    this.setState({ isLoading: false });
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };


  componentWillMount() {
    this.props.dispatch({ type: "users/getUserDetail", payload: this.props.match.params.userId });

  }
  onDelete = (id) => {
    this.props.dispatch({
      type: "users/deleteUser",
      payload: { id: this.props.match.params.userId, history: this.props.history }
    });
  }
  render() {
    return (
      <div className={style.container}>

        {this.state.isLoading ? <Spin /> : <div className={style.box_left}>
          <div ><Icon type="user" /> Full name: </div>
          <div className={style.text}> {this.props.user.acctName}</div>
          <div><Icon type="user" />Join date:</div> <div className={style.text}>{formatDateMMDDYYYY(this.props.user.joinedDate)}</div>
          <div><Icon type="user" />Update date:</div> <div className={style.text}>{formatDateMMDDYYYY(this.props.user.updatedDate)}</div>
          {/* <div><Icon type="user" /> Last Name:</div>  <div className={style.text}>{this.props.user.lastname}</div> */}
          <div><Icon type="mail" /> Email:</div>  <div className={style.text}>{this.props.user.email}</div>
          {/* <div><Icon type="team" /> Office:</div>  <div className={style.text}>{this.props.user.officeName}</div> */}
          {/* <div><Icon type="solution" /> Roles:</div> <div className={style.box_role + ' ' + style.text}>{this.props.user.selectedRoles && this.props.user.selectedRoles.map((value, i) => <p key={i}>{value.name}</p>)}</div> */}
        </div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.users);
  return {
    ...state.users
  }
}

export default connect(mapStateToProps)(UserDetail);