import React, { Component } from "react";
import { connect } from "dva";
import { Table, Divider, Tag, Input } from "antd";
const { Search } = Input;
const data = [
   {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
   },
   {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
   },
   {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
   },
];

class LoanProduct extends Component {

   onSearch = key => {
      const keyword = key.trim();
      const { dispatch } = this.props;
      if(keyword){
         dispatch({
            type: "loanProductModel/getLoanProducts"
         });
      }else{
         dispatch({
            type: "loanProductModel/getLoanProducts"
         });
      }
   }

   render() {
      const { lists, loading } = this.props;
      const columns = [
         {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
         },
         {
            title: 'Short name',
            dataIndex: 'shortName',
            key: 'shortName',
            render: text => <a>{text}</a>,
         },
         {
            title: 'Expiry Date',
            dataIndex: 'closeDate',
            key: 'closeDate',
            render: closeDate => {
               return `${closeDate[1]}-${closeDate[2]}-${closeDate[0]}`;
            },
         },
         {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
               if (status === 'loanProduct.active') {
                  return <Tag color={"green"} key={"active"} >Active</Tag>;
               }
               return <Tag color={"geekblue"} key={"disactive"} >Disactive</Tag>;
            },
         },
      ];
      return (
         <React.Fragment>
            <div >
               <Search
                  placeholder="Search by name or short name"
                  style={{ width: 300, height: 33 }}
                  onSearch={ev => this.onSearch(ev)}
               />
            </div>
            <Table columns={columns} dataSource={lists} rowKey={record => record.id} loading={loading} />
         </React.Fragment>
      );
   }
}
function mapStateToPrors(state) {
   const { lists } = state.loanProductModel;
   return { lists, loading: state.loading.global };
}
export default connect(mapStateToPrors)(LoanProduct);
