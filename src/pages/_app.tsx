import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/layouts/Sidebar';
import Header from '@/layouts/Header';
import '../styles/commonStyles.css';

const { Content } = Layout;

function LayoutContainer({ children }: PropsWithChildren) {
	return (
		<Layout
			hasSider={true}
			style={{ minHeight: '100vh' }}
		>
			<Sidebar />
			<Layout style={{ minHeight: '100%' }}>
				<Header />
				<Content style={{ backgroundColor: 'white' }}>
					<div style={{ padding: '12px' }}>
						{children}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default function App({ children }) {
	return (
		<LayoutContainer>
			{children}
		</LayoutContainer>
	);
}
