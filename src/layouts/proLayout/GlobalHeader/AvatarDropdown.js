import { Avatar, Icon, Menu, Spin, Modal, Button, Form, Input, Alert } from "antd";
import { FormattedMessage } from "umi-plugin-react/locale";
import React from "react";
import { withRouter } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.scss";
import { connect } from "dva";
import * as localStorageService from '../../../utils/localStorageService';
import { app } from '../../../index';

class AvatarDropdown extends React.Component {
   state = { visible: false };
   onLogout = () => {
      app._store.dispatch({
         type: "loginModel/loginStatus",
         isLogin: true
      });
      const { history } = this.props;
      // debugger;
      localStorageService.clearUserInfo();
      localStorage.removeItem("userId");
      history.push("/login");
   }
   onMenuClick = event => {
      const { dispatch } = this.props;
      const { key } = event;
      if (key === "logout") {
         this.onLogout();
         this.props.dispatch({
            type: "common/clearToken"
         });
      } else if (key === "changePassword") {
         this.setState({
            visible: true
         });
         dispatch({
            type: "users/getDetailUserLogin"
         });
      }
   };

   handleOk = e => {
      this.handleSubmit(e);
      //handing call api
      this.setState({
         visible: true
      });
   };

   handleCancel = e => {
      this.props.form.resetFields();
      this.setState({
         visible: false
      });
      app._store.dispatch({
         type: "handlePasswordModel/setStatus",
         changed: true
      });
   };

   handleSubmit = e => {
      const { dispatch, history } = this.props;
      dispatch({
         type: "users/getDetailUserLogin"
      });
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            dispatch({
               type: "handlePasswordModel/changePassword",
               payload: values,
               history: history
            });
         }
      });
   };

   handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   };

   compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
         callback('Two passwords that you enter is inconsistent!');
      } else {
         callback();
      }
   };

   validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
         form.validateFields(['confirm'], { force: true });
      }
      callback();
   };
   render() {
      // console.log(localStorageService.getUserInfo());
      const { username } = localStorageService.getUserInfo() ? localStorageService.getUserInfo() : '';
      const { changed } = this.props;
      const { currentUser = { avatar: "", name: "" }, menu } = this.props;
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
         labelCol: {
            sm: { span: 10 },
         },
         wrapperCol: {
            sm: { span: 14 },
         },
      };
      const menuHeaderDropdown = (
         <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
            {menu && (
               <Menu.Item key="center">
                  <Icon type="user" />
                  <FormattedMessage
                     id="menu.account.center"
                     defaultMessage="account center"
                  />
               </Menu.Item>
            )}
            {menu && (
               <Menu.Item key="settings">
                  <Icon type="setting" />
                  <FormattedMessage
                     id="menu.account.settings"
                     defaultMessage="account settings"
                  />
               </Menu.Item>
            )}
            {menu && <Menu.Divider />}

            <Menu.Item key="changePassword">
               <Icon type="key" />
               <FormattedMessage
                  id="menu.account.changePassword"
                  defaultMessage="Change password"
               />
            </Menu.Item>
            <Menu.Item key="logout">
               <Icon type="logout" />
               <FormattedMessage
                  id="menu.account.logout"
                  defaultMessage="Logout"
               />
            </Menu.Item>
         </Menu>
      );

      return (
         <React.Fragment>
            <HeaderDropdown overlay={menuHeaderDropdown}>
               <span className={`${styles.action} ${styles.account}`}>
                  <Icon type="user" className={styles.avatar} />
                  <b className={styles.name}>{username}</b>
               </span>
            </HeaderDropdown>
            <div>
               <Button type="primary" onClick={this.showModal}>
                  Open Modal
               </Button>
               <Modal
                  title="Change Password"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText="Submit"
               >
                  <div style={{ marginBottom: "22px" }}>
                     {!changed && (
                        <Alert
                           message="Password has been used in the past, please enter it again !"
                           type="error"
                           showIcon
                           closable
                           banner
                        />
                     )}
                  </div>
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                     <Form.Item label="New password" hasFeedback>
                        {getFieldDecorator('password', {
                           rules: [
                              {
                                 required: true,
                                 message: 'Please input your password!',
                              },
                              {
                                 validator: this.validateToNextPassword,
                              },
                           ],
                        })(<Input.Password />)}
                     </Form.Item>
                     <Form.Item label="Confirm password" hasFeedback>
                        {getFieldDecorator('repeatPassword', {
                           rules: [
                              {
                                 required: true,
                                 message: 'Please confirm your password!',
                              },
                              {
                                 validator: this.compareToFirstPassword,
                              },
                           ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                     </Form.Item>
                  </Form>
               </Modal>
            </div>
         </React.Fragment>
      );
   }
}

const WrappedAvatarDropdown = Form.create({ name: "register" })(AvatarDropdown);
const mapStateToProps = state => {
   const { username } = state.loginModel;
   const { changed } = state.handlePasswordModel;
   return { username, changed };
};

export default connect(mapStateToProps, null)(withRouter(WrappedAvatarDropdown));
