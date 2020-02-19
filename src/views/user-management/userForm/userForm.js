import React, { Component } from "react";
import { connect } from "dva";
import Layout from "../../../layouts/proLayout/mainProlayout";
import { Form, Input, Icon, Select, Button, message } from 'antd';
import style from "./userForm.scss";

const { Option } = Select;

class RegistrationForm extends React.Component {
   state = {
      confirmDirty: false,
      userId: null,
      title: 'create new user',
      formPass: true,
   };

   componentWillMount() {
      let payload = null;
      const id = this.props.match.params.userId;
      if (id) {
         payload = id;
         this.setState({ formPass: false, userId: id });
      }
      this.props.dispatch({
         type: "users/getUserDetail",
         payload: payload,
      });
   }

   componentDidMount() {
      this.props.form.resetFields();
   }
   success = () => {
      message.success('Add account successfully', 2);
   };

   error = () => {
      message.error('Add account failed', 2);
   };


   handleSubmit = e => {
      e.preventDefault();
      console.log(this.state.userId);
      const { history } = this.props;
      this.props.form.validateFieldsAndScroll((err, values) => {
         console.log(typeof values.acctStatus);
         if (!err) {
            delete values.confirm;
            if (this.state.userId) {
               values.jobNum = 1;
               values.loginFlag = 1;
               values.acctId = this.state.userId;
               this.props.dispatch({
                  type: "users/updateUser",
                  payload: values,
                  history: history
               });
            } else {
               values.jobNum = 1;
               values.loginFlag = 1;
               values.acctStatus = (typeof values.acctStatus === 'string') ? Number(values.acctStatus) : values.acctStatus;
               this.props.dispatch({
                  type: "users/addUser",
                  payload: values,
                  history: history
               });
            }
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
      // console.log(this.props.user);
      const { acctName, mobileNo, jobNum, loginFlag, email } = this.props.user;
      const { acctStatus } = (String(this.props.user.acctStatus));
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
         labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
         },
         wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
         },
      };
      const tailFormItemLayout = {
         wrapperCol: {
            xs: {
               span: 24,
               offset: 0,
            },
            sm: {
               span: 24,
               offset: 6,
            },
         },
      };

      return (
         <div className={style.boxForm}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} autoComplete="off">
               <Form.Item label="Username">
                  {getFieldDecorator('acctName', {
                     initialValue: acctName,
                     rules: [
                        {
                           required: true,
                           message: 'Please input Username',
                        },
                     ],
                  })(<Input prefix={
                     <Icon
                        type="user"
                        style={{ color: "rgba(0,0,0,.25)" }}
                     />
                  } />)}
               </Form.Item>
               {this.state.formPass && <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                     rules: [
                        {
                           required: true,
                           message: 'Please input your password !',
                        },
                        {
                           validator: this.validateToNextPassword,
                        },
                     ],
                  })(<Input.Password
                     prefix={
                        <Icon
                           type="lock"
                           style={{ color: "rgba(0,0,0,.25)" }}
                        />
                     } />)}
               </Form.Item>
               }
               {this.state.formPass && <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                     rules: [
                        {
                           required: true,
                           message: 'Please confirm your password !',
                        },
                        {
                           validator: this.compareToFirstPassword,
                        },
                     ],
                  })(<Input.Password
                     prefix={
                        <Icon
                           type="lock"
                           style={{ color: "rgba(0,0,0,.25)" }}
                        />
                     }
                     onBlur={this.handleConfirmBlur} />)}
               </Form.Item>}

               <Form.Item label="E-mail">
                  {getFieldDecorator('email', {
                     initialValue: email,
                     rules: [
                        {
                           type: 'email',
                           message: 'The input is not valid E-mail !',
                        },
                        {
                           required: true,
                           message: 'Please input your E-mail !',
                        },
                     ],
                  })(<Input
                     prefix={
                        <Icon
                           type="mail"
                           style={{ color: "rgba(0,0,0,.25)" }}
                        />
                     } />)}
               </Form.Item>

               <Form.Item
                  label={<span> Phone number </span>}
               >
                  {getFieldDecorator('mobileNo', {
                     initialValue: mobileNo,
                     rules: [{ required: true, message: 'Please input your phone number !', whitespace: true }],
                  })(<Input
                     prefix={
                        <Icon
                           type="phone"
                           style={{ color: "rgba(0,0,0,.25)" }}
                        />
                     }
                  />)}
               </Form.Item>

               <Form.Item
                  label={<span> Status </span>}
               >
                  {getFieldDecorator('acctStatus', {
                     initialValue: "1",
                     rules: [{ required: true, message: 'Please choose !', whitespace: true }],
                  })(
                     <Select
                        showSearch
                        placeholder="Please choose"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                           option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                     >
                        <Option value="1">Active</Option>
                        <Option value="0">Pending</Option>
                        <Option value="2">Disabled</Option>
                        <Option value="4">Locked</Option>
                     </Select>,
                  )}
               </Form.Item>


               <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </div>
      );
   }
}

const UserForm = Form.create({ name: 'register' })(RegistrationForm);

function mapStateToProps(state) {
   return {
      ...state.users
   };
}

export default connect(mapStateToProps)(UserForm);
