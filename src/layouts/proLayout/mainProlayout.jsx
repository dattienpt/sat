import ProLayout, {
  PageHeaderWrapper
} from "@ant-design/pro-layout";
import React, { useState } from "react";
import GlobalHeaderRight from "./GlobalHeader/RightContent";
import { Link, NavLink } from "react-router-dom";
const Layout = props => {
  const [collapsed, handleMenuCollapse] = useState(true);
  const [settings] = useState({});
  console.log('>>>>>>>>>',props);

  return (
  
      <ProLayout
        locale={"en-US"}
        collapsed={collapsed}
        menu={{'locale':true}}
        onCollapse={handleMenuCollapse}
        title="SAT Team"
        {...settings}
        fixSiderbar={true}
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        menuHeaderRender={(logo, title) => (
          <div id="customize_menu_header">
            {logo}
            {title}
          </div>
        )}
        menuDataRender={() => [
          {
            path: "/",
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
          return <GlobalHeaderRight {...rightProps} history={props.history}   />;
        }}
      >
        <PageHeaderWrapper title={props.name}>
          {props.children}
        </PageHeaderWrapper>
      </ProLayout>
    
  );
};
// function MainLayout() {
//   return (<Layout> test</Layout>)
// }
export default Layout;
