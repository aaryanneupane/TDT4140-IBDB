import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const DownDrop = ({ items, text, }: { items: MenuProps['items']; text: string; }) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom" trigger={["click"]} >
        <button className="flex items-center justify-between px-4 py-2 rounded-xl bg-hvit shadow-0 hover:shadow-lg">
          {text}
          <DownOutlined className="ml-2"/>
        </button>
      </Dropdown>
    </Space>
  </Space>
);

export default DownDrop;