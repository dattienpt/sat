import ProLayout, {
  PageHeaderWrapper
} from "@ant-design/pro-layout";
import React, { useState } from "react";
import GlobalHeaderRight from "./GlobalHeader/RightContent";
import { Link, } from "react-router-dom";



class  Layout extends React.Component {

 
render(){
  // const {collapsed, handleMenuCollapse} = useState(true);
  // const [settings] = useState({});
  return (
  
      <ProLayout
        title="SAT Team"
        fixSiderbar={true}
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        menuHeaderRender={(logo, title) => (
          <div id="customize_menu_header">
            {logo}
            {title}
          </div>
        )}
        breadcrumbRender={()=>''}
        menuDataRender={() => [
          {
            path: "/dashboard",
            name: "Dashboard",
            icon: "home",
          },
          {
            path: "/saving-account",
            name: "Saving Account",
            icon: "appstore",
          },
          {
            path: "/transaction",
            name: "Transaction",
            icon: "transaction",
          },
          {
            path: "/user-management",
            name: "User management",
            icon: "user",
            children: [
              {
                path: "/user-management/user-list",
                name: "User List",
                icon: "ordered-list"
              },
              {
                path: "/user-management/user-create",
                name: "Create new user",
                icon: "user-add"
              }
            ]
          }
        ]}
        menuItemRender={(menuItemProps, defaultDom) => {
          return menuItemProps.isUrl ? (
            defaultDom
          ) : (
              <Link  to={menuItemProps.path}>{defaultDom}</Link>
            );
        }}
        rightContentRender={rightProps => {
          return <GlobalHeaderRight {...rightProps} history={this.props.history}   />;
        }}
      >
        <PageHeaderWrapper >
          {this.props.children}
        </PageHeaderWrapper>
      </ProLayout>
    
  );
};
}
// function MainLayout() {
//   return (<Layout> test</Layout>)
// }
export default Layout;
