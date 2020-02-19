import React, { Component } from "react";
import { connect } from "dva";
import {
   Table,
   Button,
   Pagination,
   Modal,
   Tag
} from "antd";
import stype from "./userList.scss";
import { formatDateMMDDYYYY } from "../../../utils/formatDate";

const { confirm } = Modal;
class Users extends Component {
   componentWillMount() {
      this.props.dispatch({
         type: "users/getUsers",
         payload: { pageSize: 10, pageNum: 1,defaultCurrent:1 }
      });
   }
   viewDetail = iduser => {
      this.props.history.replace("/user-management/user-detail/" + iduser);
   };
   showConfirm = id => {
      let acc = this.props;
      confirm({
         title: "Do you want to delete  user?",
         onOk() {
            acc.dispatch({
               type: "users/deleteUser",
               payload: { id: id,defaultCurrent:1 }
            });
         },
         onCancel() {}
      });
   };

   onChange = page => {
      this.props.dispatch({
         type: "users/getUsers",
         payload: { pageSize: 10, pageNum: page ,defaultCurrent:page}
      });
   };
   onEditAcount(id) {
      this.props.history.push("/user-management/user-detail/" + id);
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
               return 0;
            }
         },
         {
            title: "Joined Date",
            dataIndex: "joinedDate",
            key: "firstname",
            render: key => {
               return formatDateMMDDYYYY(key);
            },
            sorter: (a, b) => a.joinedDate - b.joinedDate
         },
         {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "lastname",
            render: key => {
               return formatDateMMDDYYYY(key);
            },
            sorter: (a, b) => a.createdDate - b.createdDate
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
               return 0;
            }
         },
         {
            title: "Phone number",
            dataIndex: "mobileNo",
            key: "mobileNo",
            sorter: (a, b) => a.mobileNo - b.mobileNo
         },
         {
            title: "Status",
            dataIndex: "acctStatus",
            key: "acctStatus",
            render: tag => {
               switch (+tag) {
                  case 0: {
                     return (
                        <span>
                           <Tag color={"gold"} key={tag}>
                              {"Pending"}
                           </Tag>
                        </span>
                     );
                  }
                  case 1: {
                     return (
                        <span>
                           <Tag color={"green"} key={tag}>
                              {"Active"}
                           </Tag>
                        </span>
                     );
                  }
                  case 2: {
                     return (
                        <span>
                           <Tag color={"#D3D3D3"} key={tag}>
                              {"Inactive"}
                           </Tag>
                        </span>
                     );
                  }
                  case 4: {
                     return (
                        <span>
                           <Tag color={"magenta"} key={tag}>
                              {"Locked"}
                           </Tag>
                        </span>
                     );
                  }
               }
            },
            sorter: (a, b) => a.acctStatus - b.acctStatus
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
               <div className={stype.pagination}>
               <div className={stype.leftPagination}>Total: {this.props.total}</div>
               <Pagination
                  current={this.props.defaultCurrent}
                  className={stype.rightPagination}
                  pageSize={10}
                  total={this.props.total}
                  onChange={this.onChange}
               />
               </div>
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
