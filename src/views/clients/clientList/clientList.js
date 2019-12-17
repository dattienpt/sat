import React, { Component } from "react";
import { connect } from "dva";
import style from "./clientList.scss";
import { Table, Pagination, Tag, Icon, Input } from "antd";
const { Search } = Input;

class ClientList extends Component {
   state = {};

   onChangPage = ev => {
      this.props.dispatch({
         type: "clients/clientList",
         payload: { limit: 10, offset: ev }
      })

   };
   onSearch = key => {
      !key.trim()
         ? this.props.dispatch({
            type: "clients/clientList",
            payload: { limit: 10, offset: 0 }
         })
         : this.props.dispatch({
            type: "clients/searchClient",
            payload: { key: key.trim() }
         });
   }
   componentWillMount() {
      this.props.dispatch({
         type: "clients/clientList",
         payload: { limit: 10, offset: 0 }
      });
   }

   render() {
      const column = [
         {
            title: "Name",
            dataIndex: "displayName",
            key: "displayName"
         },
         {
            title: "Client#",
            dataIndex: "accountNo",
            key: "accountNo"
         },
         {
            title: "Mobile Number",
            dataIndex: "mobileNo",
            key: "externalId"
         },
         {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: status => {
               if (status.value == 'Active') {
                  return <Tag color={"green"} key={"active"} >{status.value} </Tag>;
               } else {
                  return <Tag color={"red"} key={"disactive"} >{status.value}</Tag>;
               }
            }
         },
         {
            title: "Office",
            dataIndex: "officeName",
            key: "staffName"
         },
         {
            title: "Staff",
            dataIndex: "address",
            key: "address"
         }
      ];
      const { totalFilteredRecords, pageItems } = this.props;
      return (
         <div className={style.container}>
            <div className={style.search}>
               <Search
                  placeholder="search by name/Client#/mobile"
                  style={{ width: 300, height: 33 }}
                  onSearch={ev => this.onSearch(ev)}
               />
            </div>
            <div className={style.content}>
               <Table
                  dataSource={pageItems}
                  columns={column}
                  pagination={false}
                  rowKey={client => client.id}
               />
               <div className={style.pagination}>
                  <Pagination
                     current={1}
                     pageSize={15}

                     onChange={this.onChangPage}
                     total={totalFilteredRecords}
                  />
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   console.log(state.clients);
   return {
      ...state.clients
   };
}
export default connect(mapStateToProps)(ClientList);
