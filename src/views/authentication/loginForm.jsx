import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import { connect } from "dva";
import { withRouter } from "react-router-dom";
import "./LoginForm.less";
import * as localStorageService from '../../utils/localStorageService';

class NormalLoginForm extends React.Component {
   componentWillMount() {
      if (localStorageService.getUserInfo()) {
         this.props.history.push("/dashboard");
      }
   }
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            const { history } = this.props;
            this.props.dispatch({
               type: "loginModel/checkLogin",
               payload: values,
               history: history
            });
         }
      });
   };

   render() {
      const { isLogin } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
         <div className="login-form">
            <Row
               type="flex"
               justify="center"
               align="middle"
               style={{ minHeight: "80vh" }}
            >
               <Col>
                  <div className="login-form__box">
                     {!isLogin && (
                        <Form.Item>
                           <Alert
                              message="Incorrect username or password"
                              type="error"
                              showIcon
                              closable
                           />
                        </Form.Item>
                     )}

                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                           {getFieldDecorator("username", {
                              rules: [
                                 {
                                    required: true,
                                    message: "Please input your username!"
                                 }
                              ]
                           })(
                              <Input
                                 prefix={
                                    <Icon
                                       type="user"
                                       style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                 }
                                 placeholder="Username"
                                 className="ant-input-lg"
                              />
                           )}
                        </Form.Item>
                        <Form.Item>
                           {getFieldDecorator("password", {
                              rules: [
                                 {
                                    required: true,
                                    message: "Please input your Password!"
                                 }
                              ]
                           })(
                              <Input.Password
                                 prefix={
                                    <Icon
                                       type="lock"
                                       style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                 }
                                 type="password"
                                 placeholder="Password"
                                 className="ant-input-lg"
                              />
                           )}
                        </Form.Item>

                        <Form.Item>
                           <a className="login-form-forgot" href="">
                              Forgot password
                           </a>
                        </Form.Item>
                        <Form.Item>
                           <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form__box-button"
                           >
                              Log in
                           </Button>
                        </Form.Item>
                     </Form>
                  </div>
               </Col>
            </Row>
         </div>
      );
   }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

const mapStateToProps = state => {
   const { isLogin } = state.loginModel;
   return { isLogin };
};

export default connect(mapStateToProps, null)(withRouter(LoginForm));
