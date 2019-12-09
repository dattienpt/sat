import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import "./LoginForm.less";

class NormalLoginForm extends React.Component {
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            console.log("Received values of form: ", values);
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
               style={{ minHeight: "100vh" }}
            >
               <Col>
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
                           <Input
                              prefix={
                                 <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                 />
                              }
                              type="password"
                              placeholder="Password"
                           />
                        )}
                     </Form.Item>
                     <Form.Item>
                        {getFieldDecorator("remember", {
                           valuePropName: "checked",
                           initialValue: true
                        })(<Checkbox>Remember me</Checkbox>)}
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
               </Col>
            </Row>
         </div>
      );
   }
}

const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

export default LoginForm;
