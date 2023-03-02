import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const DownDrop = ({ items, text, }: { items: MenuProps['items']; text: string; }) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <button className="flex items-center justify-between px-4 py-2 rounded-md bg-hvit shadow-0 hover:shadow-lg">
          {text}
        </button>
      </Dropdown>
    </Space>
  </Space>
);

export default DownDrop;