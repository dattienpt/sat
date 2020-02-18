import React, { Component } from "react";
import { connect } from "dva";
import Layout from "../../../layouts/proLayout/mainProlayout";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import style from "./userForm.scss";

class RegistrationForm extends React.Component {
   state = {
      confirmDirty: false,
      autoCompleteResult: [],
   };

   success = () => {
      message.success('Add account successfully', 2);
   };

   error = () => {
      message.error('Add account failed', 2);
   };


   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            // console.log('Received values of form: ', values);
            // this.props.dispatch({
            //    type: "users/addUser",
            //    payload: values,
            // });
            this.success();
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

   handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
         autoCompleteResult = [];
      } else {
         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
   };

   render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;

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
                  {getFieldDecorator('username', {
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
               <Form.Item label="Password" hasFeedback>
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
                  })(<Input.Password
                     prefix={
                        <Icon
                           type="lock"
                           style={{ color: "rgba(0,0,0,.25)" }}
                        />
                     } />)}
               </Form.Item>
               <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                     rules: [
                        {
                           required: true,
                           message: 'Please confirm your password!',
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
               </Form.Item>
               <Form.Item
                  label={<span> mobileNo </span>}
               >
                  {getFieldDecorator('mobileNo', {
                     rules: [{ required: true, message: 'Please input your mobileNo!', whitespace: true }],
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
                  label={<span> jobNum </span>}
               >
                  {getFieldDecorator('jobNum', {
                     rules: [{ required: true, message: 'Please input your jobNum!', whitespace: true }],
                  })(<Input />)}
               </Form.Item>

               <Form.Item
                  label={<span> loginFlag </span>}
               >
                  {getFieldDecorator('loginFlag', {
                     rules: [{ required: true, message: 'Please input your loginFlag!', whitespace: true }],
                  })(<Input />)}
               </Form.Item>

               <Form.Item
                  label={<span> acctStatus </span>}
               >
                  {getFieldDecorator('acctStatus', {
                     rules: [{ required: true, message: 'Please input your acctStatus!', whitespace: true }],
                  })(<Input />)}
               </Form.Item>


               <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                     Register
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

   };
}

export default connect(mapStateToProps)(UserForm);
