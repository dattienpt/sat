import { Avatar, Icon, Menu, Spin, Modal, Button, Form, Input } from "antd";
import { FormattedMessage } from "umi-plugin-react/locale";
import React from "react";
import { withRouter } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.scss";
import { connect } from "dva";
import { app } from "../../../index";

class AvatarDropdown extends React.Component {
   state = { visible: false };
   onLogout = () => {
      const { history } = this.props;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("timeLogin");
      history.push("/login");
   }
   onMenuClick = event => {
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
      this.setState({
         visible: false
      });
   };

   handleSubmit = e => {
      const { dispatch, history } = this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            dispatch({
               type: "handlePassword/changePassword",
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
      const { currentUser = { avatar: "", name: "" }, menu, username } = this.props;
      console.log(username);
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;

      const formItemLayout = {
         labelCol: {
            sm: { span: 6 },
         },
         wrapperCol: {
            sm: { span: 6 },
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

            <Menu.Item key="logout">
               <Icon type="logout" />
               <FormattedMessage
                  id="menu.account.logout"
                  defaultMessage="Logout"
               />
            </Menu.Item>
            <Menu.Item key="changePassword">
               <Icon type="logout" />
               <FormattedMessage
                  id="menu.account.logout"
                  defaultMessage="Change password"
               />
            </Menu.Item>
         </Menu>
      );

      // return currentUser && currentUser.name ? (
      //   <HeaderDropdown overlay={menuHeaderDropdown}>
      //     <span className={`${styles.action} ${styles.account}`}>
      //       <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
      //       <span className={styles.name}>{currentUser.name}</span>
      //     </span>
      //   </HeaderDropdown>
      // ) : (
      //   <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      // );

      return (
         <React.Fragment>
            <HeaderDropdown overlay={menuHeaderDropdown}>
               <span className={`${styles.action} ${styles.account}`}>
                  <Avatar
                     size="small"
                     className={styles.avatar}
                     src={
                        "https://znews-photo.zadn.vn/w660/Uploaded/unvjuas/2019_11_21/nhinlaidanhotgirlworldcup2018nguoibitungclipnongkevotudanganhkhoebodysexy17.jpg"
                     }
                     alt="avatar"
                  />
                  <span className={styles.name}>{username}</span>
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
                  width="600px"
               >
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
                     <Form.Item label="Confirm Password" hasFeedback>
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
   return { username };
};

export default connect(mapStateToProps, null)(withRouter(WrappedAvatarDropdown));
