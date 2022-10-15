import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu as AntdMenu } from 'antd';
import {
  UserOutlined,
  MenuFoldOutlined,
  BankOutlined,
  CopyrightOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import LOGO from '@/assets/images/LOGO.png';

const { Sider } = Layout;

const Logo = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;

  & > img {
    height: 32px;
    display: block;
    margin-bottom: 10px;
    margin: 10px auto;
  }
`;

const Menu = styled(AntdMenu)`
  border-right: none;
`;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuList: ItemType[] = useMemo(
    () => [
      {
        key: 'users',
        icon: <UserOutlined />,
        label: 'User',
      },
      {
        key: 'wallets',
        icon: <WalletOutlined />,
        label: 'Wallet',
      },
    ],
    []
  );

  return (
    <Sider
      style={{ borderRight: '1px solid #f4f4f4' }}
      collapsible={true}
      collapsedWidth={50}
      defaultCollapsed={false}
      width={150}
      breakpoint={'lg'}
      theme={'light'}
      trigger={<MenuFoldOutlined />}
    >
      <Logo onClick={() => navigate('/')}>
        <img src={LOGO} alt='logo' />
      </Logo>
      <Menu
        onClick={({ keyPath }) => {
          navigate(keyPath.reverse().join('/'));
        }}
        inlineIndent={16}
        selectedKeys={location?.pathname?.split('/')}
        items={menuList}
        mode={'inline'}
      />
    </Sider>
  );
}

export default Sidebar;
