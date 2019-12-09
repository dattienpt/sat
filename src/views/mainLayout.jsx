import ProLayout, {
  SettingDrawer,
  PageHeaderWrapper
} from "@ant-design/pro-layout";
import React, { useState } from "react";
import GlobalHeaderRight from "../components/GlobalHeader/RightContent";
import { Icon } from "antd";

const defaultProps = {
  bordered: true,
  expandIconPosition: "left"
};
const Layout = props => {
  const [collapsed, handleMenuCollapse] = useState(true);
  const [settings, setSettings] = useState({});
  // console.log('sessting',settings)
  return (
    <div>
      <ProLayout
        locale={"en-US"}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        title="Remax"
        {...settings}
        fixSiderbar={true}
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        menuHeaderRender={(logo, title) => (
          <div
            id="customize_menu_header"
            onClick={() => {
              window.open("https://remaxjs.org/");
            }}
          >
            {logo}
            {title}
          </div>
        )}
        menuDataRender={() => [
          {
            path: "/",
            name: "welcome",
            icon: "smile",
            children: [
              {
                path: "/welcome",
                name: "one",
                children: [
                  {
                    path: "/welcome/welcome",
                    name: "two",
                    icon: "smile",
                    exact: true
                  }
                ]
              }
            ]
          },
          {
            path: "/home",
            name: "minh vuong",
            icon: "home",
            children: [
              {
                path: "/welcome",
                name: "one"
              }
            ]
          }
        ]}
        menuItemRender={(menuItemProps, defaultDom) => {
          return menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <a to={menuItemProps.path}>{defaultDom}</a>
          );
        }}
        onSelect={ev => console.log(ev)}
        rightContentRender={rightProps => {
          console.log(rightProps);
          return <GlobalHeaderRight {...rightProps} />;
        }}
      >
        <PageHeaderWrapper>Hello World<Icon type="question" />
            
          </PageHeaderWrapper>
      </ProLayout>

      {/* <SettingDrawer settings={settings} onSettingChange={setSettings} /> */}
    </div>
  );
};

export default Layout;
