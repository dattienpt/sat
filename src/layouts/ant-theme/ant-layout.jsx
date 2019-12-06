import React from "react";
import ProLayout from "@ant-design/pro-layout";
import BasicLayout, {
   PageHeaderWrapper,
   RightContent,
   DefaultFooter
} from "@ant-design/pro-layout";
import { Icon, Result, Button } from "antd";
import UserList from "../../views/user/usersList";
const defaultFooterDom = (
   <DefaultFooter
      copyright="2019 蚂蚁金服体验技术部出品"
      links={[
         {
            key: "Ant Design Pro",
            title: "Ant Design Pro 123",
            href: "https://pro.ant.design",
            blankTarget: true
         },
         {
            key: "github",
            title: <Icon type="github" />,
            href: "https://github.com/ant-design/ant-design-pro",
            blankTarget: true
         },
         {
            key: "Ant Design",
            title: "Ant Design",
            href: "https://ant.design",
            blankTarget: true
         }
      ]}
   />
);

const footerRender = () => {
   return (
      <>
         {defaultFooterDom}
         <div>
            <a
               href="https://www.netlify.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <img
                  src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
                  width="82px"
                  alt="netlify logo"
               />
            </a>
         </div>
      </>
   );
};

class AntLayout extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <ProLayout
            menuDataRender={() => [
               {
                  path: "/",
                  name: "WELCOME",
                  icon: "smile",
                  children: [
                     {
                        path: "/welcome",
                        name: "ONE",
                        children: [
                           {
                              path: "/welcome/welcome",
                              name: "ONE 1",
                              icon: "smile",
                              exact: true,
                              key: 1
                           },
                           {
                              path: "/welcome/welcome",
                              name: "ONE 2",
                              icon: "smile",
                              exact: true,
                              key: 2
                           }
                        ]
                     }
                  ]
               }
            ]}
            locale={true}
            fixedHeader={true}
            // {...defaultProps}
            fixSiderbar={true}
            title="Remax"
            logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
            menuHeaderRender={(logo, title) => (
               <div
                  // Id="customize_menu_header"
                  onClick={() => {
                     Window.open("https://remaxjs.org/");
                  }}
               >
                  {logo}
                  {title}
               </div>
            )}
            // rightContentRender={}
            footerRender={footerRender}
         >
            <PageHeaderWrapper content="Welcome to your use">
               {this.props.children}
            </PageHeaderWrapper>

            <UserList></UserList>
         </ProLayout>
      );
   }
}

export default AntLayout;
