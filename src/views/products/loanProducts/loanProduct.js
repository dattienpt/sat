import React, { Component } from "react";
import { connect } from "dva";
import { Table, Divider, Tag, Input, Button, Icon } from "antd";

class LoanProduct extends Component {
   state = { searchText: "", searchedColumn: "" };
   componentWillMount() {
      const { dispatch } = this.props;
      dispatch({
         type: "loanProductModel/getLoanProducts"
      });
   }

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
      let { loading, lists } = this.props;
      if (this.props.lists.data) {
         lists = this.props.lists.data;
      }
      const columns = [
         {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            ...this.getColumnSearchProps("name")
         },
         {
            title: 'Short name',
            dataIndex: 'shortName',
            key: 'shortName',
            render: text => <a>{text}</a>,
            ...this.getColumnSearchProps("shortName")
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
            <Table columns={columns} dataSource={lists} rowKey={record => record.id} loading={loading} />
         </React.Fragment>
      );
   }
}
function mapStateToPrors(state) {
   const { lists, loading } = state.loanProductModel;
   return { lists, loading };
}
export default connect(mapStateToPrors)(LoanProduct);
