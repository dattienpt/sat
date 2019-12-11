import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button,Slider,Checkbox } from 'antd';
const { Option } = Select;

import stype from './createUser.scss';
class CreateUser extends Component {
    state = {  }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      };
      componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
      }
    render() { 
        const { getFieldDecorator } = this.props.form;

        return ( <div >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="First name">
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last name">
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },],
          })(<Input />)}
        </Form.Item>

        
        
        <Form.Item >
          <Checkbox >
          Auto generate password
          </Checkbox>
        </Form.Item>
        <Form.Item >
          <Checkbox >
          Override password expiry policy ?
          </Checkbox>
        </Form.Item>
        
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(<Input />)}
        </Form.Item>
        
        <Form.Item label="Repeat password">
          {getFieldDecorator('repeatPassword', {
            rules: [{ required: true, message: 'Please input your repeat password!' }],
          })(<Input />)}
        </Form.Item>
        
        <Form.Item label="Office">
          {getFieldDecorator('officeId', {
            rules: [{ required: true, message: 'Please select your office!' }],
          })(
            <Select
              placeholder="Select Office"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Staff">
          {getFieldDecorator('gender', {
          })(
            <Select
              placeholder="Select Staff"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div> );
    }
}
 function mapStateToProps(state){
     return {template:state.template}
 }

export default connect(mapStateToProps)(Form.create({ name: 'coordinated' })(CreateUser));