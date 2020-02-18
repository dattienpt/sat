import React, { Component } from "react";
import { connect } from "dva";
import Layout from "../../../layouts/proLayout/mainProlayout";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
   {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
         {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
               {
                  value: 'xihu',
                  label: 'West Lake',
               },
            ],
         },
      ],
   },
   {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
         {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
               {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
               },
            ],
         },
      ],
   },
];


class RegistrationForm extends React.Component {
   state = {
      confirmDirty: false,
      autoCompleteResult: [],
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            console.log('Received values of form: ', values);
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
            sm: { span: 8 },
         },
         wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
         },
      };
      const tailFormItemLayout = {
         wrapperCol: {
            xs: {
               span: 24,
               offset: 0,
            },
            sm: {
               span: 16,
               offset: 8,
            },
         },
      };

      return (
         <Form {...formItemLayout} onSubmit={this.handleSubmit} autoComplete="off">
            <Form.Item label="Username">
               {getFieldDecorator('email', {
                  rules: [
                     {
                        required: true,
                        message: 'Please input Username',
                     },
                  ],
               })(<Input />)}
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
               })(<Input.Password />)}
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
               })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
               label={<span> mobileNo </span>}
            >
               {getFieldDecorator('mobileNo', {
                  rules: [{ required: true, message: 'Please input your mobileNo!', whitespace: true }],
               })(<Input />)}
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
      );
   }
}

const UserForm = Form.create({ name: 'register' })(RegistrationForm);


function mapStateToProps(state) {
   return {

   };
}

export default connect(mapStateToProps)(UserForm);
