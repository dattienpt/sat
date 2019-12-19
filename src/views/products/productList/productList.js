import React, { Component } from "react";
import { connect } from "dva";
import { Tabs } from "antd";
import LoanProduct from "../loanProducts/loanProduct";
import SavingProduct from "../savingProducts/savingProduct";
import ShareProduct from "../shareProducts/shareProduct";
const { TabPane } = Tabs;
import style from "./productList.scss";
class ProductList extends Component {
   callback = key => {
      console.log(key);
   };
   componentWillMount(){
      this.props.dispatch({
         type: "users/namePage",
         payload: ''
      });
      }
   render() {
      return (
         <div className={style.container}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
               <TabPane tab={<span className={style.titleProduct}>Loan Products</span>} key="1">
                  <LoanProduct></LoanProduct>
               </TabPane>
               <TabPane tab={<span className={style.titleProduct}>Savings Products</span>} key="2">
                  <SavingProduct> </SavingProduct>
               </TabPane>
               <TabPane tab={<span className={style.titleProduct}>Share Products</span>} key="3">
                  <ShareProduct></ShareProduct>
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
