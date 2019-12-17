import { Icon, Tooltip } from "antd";
import React from "react";
import { formatMessage } from "umi-plugin-react/locale";

import Avatar from "./AvatarDropdown";
import SelectLang from "../SelectLang";
import styles from "./index.scss";

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === "dark" && layout === "topmenu") {
    className = `${styles.right}  ${styles.dark}`;
  }

  if (theme === "dark" && layout === "topmenu") {
    className = `right dark`;
  }

  return (
    <div className={className}>
      <Tooltip
        title={formatMessage({
          id: "component.globalHeader.help"
        })}>
      </Tooltip>
      <Avatar history={props.history} />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default GlobalHeaderRight;
