import React, { Component } from "react";
import { connect } from "dva";
import { Table, Button, Input, Icon } from "antd";
import stype from "./userList.scss";
import Layout from "../../../layouts/proLayout/mainProlayout";
class Users extends Component {
   state = { searchText: "", searchedColumn: "", isloading: true };

   componentWillReceiveProps() {
      this.setState({ isloading: false });
   }
   componentWillMount() {
      this.props.dispatch({ type: "users/getUsers" });
   }
   viewDetail = iduser => {
      this.props.history.replace("/user-management/user-detail/" + iduser);
   };

   getColumnSearchProps = dataIndex => ({
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters
      }) => (
            <div style={{ padding: 8 }}>
               <Input
                  ref={node => {
                     this.searchInput = node;
                  }}
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={e =>
                     setSelectedKeys(e.target.value ? [e.target.value] : [])
                  }
                  onPressEnter={() =>
                     this.handleSearch(selectedKeys, confirm, dataIndex)
                  }
                  style={{ width: 188, marginBottom: 8, display: "block" }}
               />
               <Button
                  type="primary"
                  onClick={() =>
                     this.handleSearch(selectedKeys, confirm, dataIndex)
                  }
                  icon="search"
                  size="small"
                  style={{ width: 90, marginRight: 8 }}
               >
                  Search
            </Button>
               <Button
                  onClick={() => this.handleReset(clearFilters)}
                  size="small"
                  style={{ width: 90 }}
               >
                  Reset
            </Button>
            </div>
         ),
      filterIcon: filtered => (
         <Icon
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
         />
      ),
      onFilter: (value, record) =>
         record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
         if (visible) {
            setTimeout(() => this.searchInput.select());
         }
      },
      render: text => (this.state.searchedColumn === dataIndex ? text : text)
   });

   handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
         searchText: selectedKeys[0],
         searchedColumn: dataIndex
      });
   };

   handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: "" });
   };

   render() {
      const column = [
         {
            title: "First Name",
            dataIndex: "firstname",
            key: "firstname",
            ...this.getColumnSearchProps("firstname")
         },
         {
            title: "Last Name",
            dataIndex: "lastname",
            key: "lastname",
            ...this.getColumnSearchProps("lastname")
         },
         {
            title: "Email",
            dataIndex: "email",
            key: "email"
         },
         {
            title: "Office",
            dataIndex: "officeName",
            key: "officeName"
         }
      ];
      return (
         <div>
            <div className={stype.users}>
               <div className={stype.button}>
                  <Button
                     type="primary"
                     onClick={() => {
                        this.props.history.replace(
                           "/user-management/user-create"
                        );
                     }}
                     icon="create"
                  >
                     Create Users
                  </Button>
               </div>

               <Table
                  onRowClick={(user) => { this.viewDetail(user.id) }}
                  className={stype.table}
                  columns={column}
                  loading={this.state.isloading}
                  dataSource={Array.isArray(this.props.users) ? this.props.users : []}
                  rowKey={user => user.id}
               />
            </div>
         </div>
      );
   }
}
function mapStateToPrors(state) {
   return { ...state.users };
}
export default connect(mapStateToPrors)(Users);
