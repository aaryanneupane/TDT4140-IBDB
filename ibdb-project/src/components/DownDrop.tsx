import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
        3rd menu item
      </a>
    ),
  },
];

const DownDrop: React.FC = (elmnt) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom">
        <Button>Menu</Button>
      </Dropdown>

    </Space>
  </Space>
);

// function DownDrop(elmnt: { elements: any[]; }) {
//   return (
//     <ul>
//       {elmnt.elements.map(entry =>(
//         <li key={entry.id}>{entry.name}</li>
//       ))}
//     </ul>
//   );
// }

export default DownDrop;