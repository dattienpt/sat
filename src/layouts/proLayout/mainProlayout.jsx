import ProLayout, {
  PageHeaderWrapper
} from "@ant-design/pro-layout";
import React, { useState } from "react";
import GlobalHeaderRight from "./GlobalHeader/RightContent";
import { Link, } from "react-router-dom";
import { connect } from "dva";
import sesting from './config/config'
class Layout extends React.Component {

  render() {
    return (
      <ProLayout
        {...sesting}
        menuHeaderRender={(logo, title) => (
          <div id="customize_menu_header">
            {logo}
            {title}
          </div>
        )}
        breadcrumbRender={() => ''}
        menuItemRender={(menuItemProps, defaultDom) => {
          return menuItemProps.isUrl ? (
            defaultDom
          ) : (
              <Link style={{ textDecoration: 'none' }} to={menuItemProps.path}>{defaultDom}</Link>
            );
        }}
        rightContentRender={rightProps => {
          return <GlobalHeaderRight {...rightProps} history={this.props.history} />;
        }}
      >
        <PageHeaderWrapper title={this.props.name}>
          {this.props.children}
        </PageHeaderWrapper>
      </ProLayout>
    );
  };
}
function mapStateToProps(state) {
  return { name: state.users.namePage }
}
export default connect(mapStateToProps)(Layout);
