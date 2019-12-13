import React, { Component } from "react";
import { connect } from "dva";
import style from "./clientList.scss";
import { Table, Pagination, Tag, Icon, Input } from "antd";
const { Search } = Input;

class ClientList extends Component {
   state = {};
   column = [
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
         title: "External Id",
         dataIndex: "externalId",
         key: "externalId"
      },
      {
         title: "Status",
         dataIndex: "active",
         key: "active",
         render: status => {
            if (status) {
               return <Tag color={"green"} key={"active"} />;
            } else {
               return <Tag color={"geekblue"} key={"disactive"} />;
            }
         }
      },
      {
         title: "Office",
         dataIndex: "staffName",
         key: "staffName"
      },
      {
         title: "Staff",
         dataIndex: "address",
         key: "address"
      }
   ];
   onChangPage = ev => {
    this.props.dispatch({
        type: "clients/clientList",
        payload: { limit: 10, offset: ev }
     })
      
   };
   onSearch = key=>{
       console.log(key.trim());
       
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
      return (
         <div className={style.container}>
            <div className={style.search}>
               <Input />{" "}
               <Search
                  placeholder="input search text"
                  style={{ width: 200, height: 33 }}
                  onSearch={ev =>this.onSearch(ev)}
               />
            </div>
            <div className={style.content}>
               <Table
                  columns={this.columns}
                  dataSource={this.props.clients}
                  pagination={false}
                  rowKey={client => client.id}
               />
               <Pagination
                  current={1}
                  pageSize={15}
                  onChange={this.onChangPage}
                  total={this.props.totalFilteredRecords}
               />
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   console.log(state.clients);
   return {
      totalFilteredRecords: state.clients.listclient.totalFilteredRecords,
      clients: state.clients.listclient.pageItems
   };
}
export default connect(mapStateToProps)(ClientList);
