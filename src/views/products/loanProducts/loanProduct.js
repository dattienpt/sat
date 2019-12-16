import React, { Component } from "react";
import { connect } from "dva";
import { Table, Divider, Tag } from "antd";

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



   render() {
      const { lists } = this.props;
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
            render: text => <a>{text}</a>,
         },
         {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => <a>{text}</a>,
         },
      ];
      return (
         <Table columns={columns} dataSource={lists} rowKey={record => record.id} />
      );
   }
}
function mapStateToPrors(state) {
   const { lists } = state.loanProductModel;
   return { lists };
}
export default connect(mapStateToPrors)(LoanProduct);
