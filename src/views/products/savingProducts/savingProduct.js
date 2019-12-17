import React, { Component } from "react";
import { connect } from "dva";
import style from "./saving.scss";
import { Table, Pagination, Button, Icon, Input } from "antd";
const { Search } = Input;

class SavingProduct extends Component {
   state = { isLoading: true,searchText: "", searchedColumn: "" };

   componentWillReceiveProps(ev) {
      this.setState({ isLoading: false });
   }
   onChangPage = ev => {
      this.props.dispatch({
         type: "saving/getSaving",
         payload: { limit: 10, offset: ev }
      });
   };
   componentWillMount() {
      this.props.dispatch({
         type: "saving/getSaving"
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
      const { list } = this.props;
      const column = [
         {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...this.getColumnSearchProps("name")
         },
         {
            title: "Short name",
            dataIndex: "shortName",
            key: "shortName",
            ...this.getColumnSearchProps("shortName")
         }
      ];
      return (
         <div className={style.container}>
            <div className={style.search}></div>
            <div className={style.content}>
               <Table
                  loading={this.state.isLoading}
                  dataSource={list}
                  columns={column}
                  pagination={false}
                  rowKey={sv => sv.id}
               />
               <div className={style.pagination}>
                  <Pagination
                     current={1}
                     pageSize={10}
                     onChange={this.onChangPage}
                     total={list.length}
                  />
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   console.log(state.saving);
   return {
      ...state.saving
   };
}
export default connect(mapStateToProps)(SavingProduct);