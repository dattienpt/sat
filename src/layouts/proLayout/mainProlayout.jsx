import ProLayout, {
  SettingDrawer,
  PageHeaderWrapper
} from "@ant-design/pro-layout";
import React, { useState } from "react";
import GlobalHeaderRight from "./GlobalHeader/RightContent";
import { Icon, Table, Tag, Divider } from "antd";

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
            name: "dat",
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
        <PageHeaderWrapper>
          <div>
            <Table columns={columns} dataSource={data} />
          </div>
        </PageHeaderWrapper>
      </ProLayout>

      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </div>
  );
};

export default Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
