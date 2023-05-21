import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu as AntdMenu } from 'antd';
import {
  TagOutlined,
  MenuFoldOutlined,
  StarOutlined,
  FormOutlined,
  WalletOutlined,
  ApartmentOutlined,
  GlobalOutlined,
  DollarOutlined,
  SwapOutlined,
  CarryOutOutlined,
  DatabaseOutlined,
  FileSyncOutlined,
  ShareAltOutlined,
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
      // {
      //   key: 'asset',
      //   icon: <WalletOutlined />,
      //   label: 'Asset',
      // },
      // {
      //   key: 'category',
      //   icon: <ApartmentOutlined />,
      //   label: 'Category',
      // },
      {
        key: 'data',
        icon: <DatabaseOutlined />,
        label: 'Data',
        children: [
          {
            key: 'transaction',
            icon: <SwapOutlined />,
            label: 'Transaction',
          },
          {
            key: 'dividend',
            icon: <ShareAltOutlined />,
            label: 'Dividend',
          },
          {
            key: 'payment',
            icon: <DollarOutlined />,
            label: 'Payment',
          },
          {
            key: 'item',
            icon: <TagOutlined />,
            label: 'Item',
          },
          {
            key: 'indicator',
            icon: <GlobalOutlined />,
            label: 'Indicator',
          },
        ],
      },
      {
        key: 'report',
        icon: <FileSyncOutlined />,
        label: 'Report',
      },
      {
        key: 'event',
        icon: <CarryOutOutlined />,
        label: 'Event',
      },

      {
        key: 'note',
        icon: <FormOutlined />,
        label: 'Note',
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
