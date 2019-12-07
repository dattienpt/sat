import { Avatar, Icon, Menu, Spin } from "antd";
import { FormattedMessage } from "umi-plugin-react/locale";
import React from "react";

import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.scss";

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === "logout") {
      console.log("hello", styles);
    }

    return;
  };

  render() {
    const { currentUser = { avatar: "", name: "" }, menu } = this.props;

    const menuHeaderDropdown = (
      <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage
              id="menu.account.center"
              defaultMessage="account center"
            />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage
              id="menu.account.settings"
              defaultMessage="account settings"
            />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    // return currentUser && currentUser.name ? (
    //   <HeaderDropdown overlay={menuHeaderDropdown}>
    //     <span className={`${styles.action} ${styles.account}`}>
    //       <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
    //       <span className={styles.name}>{currentUser.name}</span>
    //     </span>
    //   </HeaderDropdown>
    // ) : (
    //   <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    // );

    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={
              "https://znews-photo.zadn.vn/w660/Uploaded/unvjuas/2019_11_21/nhinlaidanhotgirlworldcup2018nguoibitungclipnongkevotudanganhkhoebodysexy17.jpg"
            }
            alt="avatar"
          />
          <span className={styles.name}>{"minhvuong"}</span>
        </span>
      </HeaderDropdown>
    );
  }
}
export default AvatarDropdown;
