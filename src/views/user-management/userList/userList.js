import React, { Component } from "react";
import { connect } from "dva";
import { Table, Button, Input, Icon, Pagination, Modal, message, Tag } from "antd";
import stype from "./userList.scss";
import { formatDateMMDDYYYY } from "../../../utils/formatDate";

const { confirm } = Modal;
class Users extends Component {
   state = { searchText: "", searchedColumn: "" };

   componentWillMount() {
      this.props.dispatch({
         type: "users/getUsers",
         payload: { pageSize: 10, pageNum: 1 }
      });
   }
   viewDetail = iduser => {
      this.props.history.replace("/user-management/user-detail/" + iduser);
   };
   showConfirm = id => {
      let acc = this.props;
      confirm({
         title: "Do you Want to delete these user?",
         onOk() {
            acc.dispatch({
               type: "users/deleteUser",
               payload: { acctId: id }
            });
         },
         onCancel() {
         }
      });
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
   onChange = page => {
      this.props.dispatch({
         type: "users/getUsers",
         payload: { pageSize: 10, pageNum: page }
      });
   };
   onEditAcount(id) {
      console.log(id);
      this.props.history.push('/user-management/user-detail/' + id);
   }
   render() {
      const { loading } = this.props;
      const isload = loading.effects["users/getUsers"];
      const column = [
         {
            title: "Account name",
            dataIndex: "acctName",
            key: "acctName",
            sorter: (a, b) => {
               if (a.acctName < b.acctName) {
                  return -1;
               }
               if (a.acctName > b.acctName) {
                  return 1;
               }
               return 0

            },
         },
         {
            title: "Joined Date",
            dataIndex: "joinedDate",
            key: "firstname",
            render: key => {
               return formatDateMMDDYYYY(key);
            },
            sorter: (a, b) => a.joinedDate - b.joinedDate,
         },
         {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "lastname",
            render: key => {
               return formatDateMMDDYYYY(key);
            },
            sorter: (a, b) => a.createdDate - b.createdDate,
         },
         {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => {
               if (a.email < b.email) {
                  return -1;
               }
               if (a.email > b.email) {
                  return 1;
               }
               return 0
            },
         },
         {
            title: "Phone number",
            dataIndex: "mobileNo",
            key: "mobileNo",
            sorter: (a, b) => a.mobileNo - b.mobileNo,
         },
         {
            title: "Status",
            dataIndex: "acctStatus",
            key: "acctStatus",
            render: tag => {
               if (+tag === 1) {
                  return <span>
                     <Tag color={"green"} key={tag}>
                        {"Active"}
                     </Tag>

                  </span>
               } else {
                  return <span>
                     <Tag color={"volcano"} key={tag}>
                        {"inactive "}
                     </Tag>
                     );
              </span>
               }
            },
            sorter: (a, b) => a.acctStatus - b.acctStatus,
         },
         {
            title: "Action",
            dataIndex: "ac",
            key: "action",
            render: (a, b) => {
               return (
                  <div className={stype.action}>
                     <Button
                        onClick={() => {
                           this.onEditAcount(b.acctId);
                        }}
                        icon="edit"
                     ></Button>
                     <Button
                        onClick={() => this.showConfirm(b.acctId)}
                        icon="delete"
                     ></Button>
                  </div>
               );
            }
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
                     icon="plus"
                  >
                     ADD USER
                  </Button>
               </div>

               <Table
                  className={stype.table}
                  columns={column}
                  loading={isload}
                  pagination={false}
                  dataSource={
                     Array.isArray(this.props.users) ? this.props.users : []
                  }
                  rowKey={user => user.id}
               />
               <Pagination
                  className={stype.rightPagination}
                  pageSize={10}
                  total={this.props.total}
                  onChange={this.onChange}
               />
            </div>
         </div>
      );
   }
}
function mapStateToPrors(state) {
   console.log(state);
   const { loading, users } = state;
   return { ...users, loading };
}
export default connect(mapStateToPrors)(Users);
