import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import { connect } from "dva";
import { withRouter } from "react-router-dom";
import "./LoginForm.less";

class NormalLoginForm extends React.Component {
   componentWillMount() {
      if (localStorage.getItem("userToken")) {
         this.props.history.push("/dashboard");
      }
   }
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            const { history } = this.props;
            console.log("Received values of form: ", values);
            this.props.dispatch({
               type: "loginModel/checkLogin",
               payload: values,
               history: history
            });
         }
      });
   };

   render() {
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
                  <div className="form-login-box">
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
                              className="login-form-button"
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
   return {};
};

export default connect(mapStateToProps, null)(withRouter(LoginForm));
