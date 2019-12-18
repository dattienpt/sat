import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Alert } from "antd";
import { connect } from "dva";
import { withRouter } from "react-router-dom";
import style from './LoginForm.scss';
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
         <div className={style.loginForm}>
            <Row
               type="flex"
               justify="center"
               align="middle"
               style={{ minHeight: "80vh" }}
            >
               <Col>
                  <div className={style.loginFormBox}>
                     <Form.Item>
                        <h3 className={style.loginFormBoxTitle}>SAT Team</h3>
                     </Form.Item>
                     {!isLogin && (
                        <Form.Item>
                           <Alert
                              message="Log in to continue using"
                              type="warning"
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
                                 className={style.antInputLg}
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
                                 className={style.antInputLg}
                              />
                           )}
                        </Form.Item>

                        <Form.Item>
                           <Button
                              type="primary"
                              htmlType="submit"
                              className={style.loginFormBoxButton}
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
