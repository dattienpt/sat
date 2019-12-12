import React, { Component } from "react";
import { Form } from "react-formio";
import form from "./configForm";
import style from "./editForm.scss";
import { Transfer, message } from "antd";
import { connect } from "dva";
import Layout from "../../../layouts/proLayout/mainProlayout";

class editUser extends Component {
  constructor(props) {
    super(props);
    this.form = form;
  }
  state = {
    isEdit: false,
    availableRoles: [],
    mockData: [],
    selectedRoles: [],
    targetKeys: []
  };
  componentWillMount() {
    if (this.props.location.pathname.indexOf("/users/edit") === 0) {
      this.setState({ isEdit: true });
      this.props.dispatch({
        type: "users/getUserTemplate",
        payload: this.props.match.params.userId
      });
      this.props.dispatch({
        type: "users/getStaffUser",
        payload: this.props.match.params.userId
      });
      this.form.components[0].components[4].conditional.json = {
        "===": [
          {
            var: "data.typeShow"
          },
          false
        ]
      };
    } else {
      this.form.components[0].components[4].conditional.json = {};
      this.props.dispatch({
        type: "users/getTemplate",
        payload: this.props.match.params.userId
      });
    }
  }
  
  componentWillReceiveProps(ev) {
    this.getMock();
    if (this.props.location.pathname.indexOf("/user-management/user-edit") === 0) {
      this.form.components[0].title = "Edit user";

      this.setState({ ...this.props.editTemplate });
      if (this.props.editTemplate) {
        this.form.components[0].components[8].data.values = this.props.editTemplate.allowedOffices;
        this.form.components[0].components[8].defaultValue =
          this.props.editTemplate.officeId + "";
      }
    } else {
      this.form.components[0].components[8].defaultValue = null;
      if (this.props.allowedOffices)
        this.form.components[0].components[6].data.values = this.props.allowedOffices;
        // this.setState(prevState => ({
        //   availableRoles: [...prevState.availableRoles, this.props.availableRoles]
        // }))
        
     this.setState({ availableRoles: [...this.props.availableRoles] });
     
    }
  }
  getMock = () => {
    const targetKeys = [];
    const mockData = [];

    this.props.availableRoles.forEach(item => {
      const data = {
        key: item.id,
        title: item.name,
        description: item.description,
        disabled: item.disabled,
        chosen: item.id
      };
      mockData.push(data);
    });
    // this.state.selectedRoles.forEach(item => {
    //   const data = {
    //     key: item.id,
    //     title: item.name,
    //     description: item.description,
    //     disabled: item.disabled,
    //     chosen: item.id
    //   };
    //   mockData.push(data);
    //   targetKeys.push(item.id);
    // });

    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };
  onSubmit = data => {
    data.roles = this.state.targetKeys;
    delete data.staff;
    delete data.submit;
    data.sendPasswordToEmail=false;
    if (data.roles.length > 0) {
      this.props.dispatch({
        type: "users/addUser",
        payload: { data: data, history: this.props.history }
      });
    } else {
      message.error("please choose role user", 10);
    }
  };
  onUpdate = data => {
    data.roles = this.state.targetKeys;
    delete data.sendPasswordToEmail;
    delete data.allowedOffices;
    delete data.availableRoles;
    delete data.submit;
    delete data.selectedRoles;
    delete data.staff;
    delete data.officeName;
    delete data.cancel;
    delete data.overridePasswordExpiryPolicy;
    delete data.id;
    delete data.isSelfServiceUser;
    delete data.passwordNeverExpires;
    if (data.roles.length > 0)    this.props.dispatch({
      type: "users/updateUser",
      payload: {
        id: this.props.match.params.userId,
        data,
        history: this.props.history
      }
    });else{
      message.error("please choose role user", 10);
    }
  };
  render() {
    return (
      <div className={style.box_container}>
   
        {this.state.isEdit && (
          <Form
            getForms={ev => console.log("log", ev)}
            form={this.form}
            onSubmit={ev => this.onUpdate(ev.data)}
            submission={{ data: { ...this.props.editTemplate } }}
          />
        )}
        {!this.state.isEdit && (
          <Form
          onError={ev=>console.log(ev)
          }
          onSubmitDone={ev=>console.log(ev)
          }
            form={this.form}
            getForms={ev => console.log("log", ev)}
            onSubmit={ev =>{ this.onSubmit(ev.data)}}
          />
        )}
        <div className={style.formio_tranfer}>
          <div className={style.role}>
            <div>Role</div>
            <div>Role selected</div>
          </div>
          <Transfer
          listStyle={{
            height: 260,
            width:200,
            background: '#ffffff'

          }}
            dataSource={this.state.mockData}
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            render={item => item.title}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    availableRoles: [...state.users.template.availableRoles],
    allowedOffices: [...state.users.template.allowedOffices],
    editTemplate: state.users.editTemplate
  };
}

export default connect(mapStateToProps)(editUser);
