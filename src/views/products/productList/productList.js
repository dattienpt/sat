import React, { Component } from "react";
import { connect } from "dva";
import { Tabs } from "antd";
import LoanProduct from "../loanProducts/loanProduct";
const { TabPane } = Tabs;
import style from "./productList.scss";
class ProductList extends Component {

   componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
         type: "loanProductModel/getLoanProducts"
      });
   }

   callback = (key) => {
      console.log(key);
   }

   render() {
      return (
         <div className={style.container}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Loan Products" key="1">
               <LoanProduct></LoanProduct>
            </TabPane>
            <TabPane tab="Savings Products" key="2">
               Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Share Products" key="3">
               Content of Tab Pane 3
            </TabPane>
         </Tabs>
         </div>
      );
   }
}
function mapStateToPrors(state) {
   return {};
}
export default connect(mapStateToPrors)(ProductList);
