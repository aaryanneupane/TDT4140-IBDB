import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const DownDrop = ({ items, text, }: { items: MenuProps['items']; text: string; }) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom">
        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg"> {text}</button>
      </Dropdown>
    </Space>
  </Space>
);

export default DownDrop;