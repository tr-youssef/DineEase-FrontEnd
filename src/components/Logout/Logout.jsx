import { Dropdown, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="1">Logout</Menu.Item>
  </Menu>
);

const dropdownOverlay = menu;
const dropdownTrigger = ['click'];
const dropdownPlacement = 'bottomLeft';
const avatarSize = 'large';

const Logout = (
  <Dropdown overlay={dropdownOverlay} trigger={dropdownTrigger} placement={dropdownPlacement}>
    <div onClick={e => e.preventDefault()}>
      <Avatar size={avatarSize} icon={<UserOutlined />} />
    </div>
  </Dropdown>
);

export default Logout;

