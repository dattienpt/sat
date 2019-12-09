import { Dropdown } from "antd";
import React from "react";
import classNames from "classnames";
import styles from "./index.scss";

const HeaderDropdown = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown
    overlayClassName={classNames(styles.container, cls)}
    {...restProps}
  />
);

export default HeaderDropdown;
