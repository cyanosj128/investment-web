import React from 'react';
import styled from 'styled-components';
import { Layout, Dropdown, Menu } from 'antd';
import {
  UserSwitchOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { ColorConstant } from '@/constants';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';

const Container = styled(Layout.Header)`
  height: 50px;
  display: flex;
  justify-content: space-between;
  text-align: right;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 10px;
  z-index: 999;
  background: linear-gradient(
    to right,
    ${ColorConstant.MAIN_EMBER} 0%,
    ${ColorConstant.MAIN_CYAN} 100%
  ); ;
`;

function Header() {
  const menuItems: ItemType[] = [
    {
      label: 'Portal',
      key: 'PORTAL',
      icon: <HomeOutlined />,
    },
    {
      label: 'Logout',
      key: 'LOGOUT',
      icon: <LogoutOutlined />,
    },
  ];

  return <Container></Container>;
}

export default React.memo(Header);
