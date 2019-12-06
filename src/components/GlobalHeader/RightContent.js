import { Icon, Tooltip } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';



const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  console.log('stype',styles);
  
  let className = "right";

  if ( theme=== 'dark' && layout === 'topmenu') {
    className = `right dark`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        defaultValue="umi ui"
        // dataSource={[
        //   formatMessage({
        //     id: 'component.globalHeader.search.example1',
        //   }),
        //   formatMessage({
        //     id: 'component.globalHeader.search.example2',
        //   }),
        //   formatMessage({
        //     id: 'component.globalHeader.search.example3',
        //   }),
        // ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      />
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default GlobalHeaderRight;
