import React, { Component } from 'react'
import { Layout, Menu, Button, Popconfirm } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css';
import './styles/App.css'
import './styles/normalize.css'
import {
  MenuUnfoldOutlined,
	MenuFoldOutlined,
	LikeOutlined,
	PhoneOutlined,
	DollarOutlined,
	FileDoneOutlined,
	BarChartOutlined,
	LogoutOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import Main from './Main'
import Orders from './Orders'
import Prices from './Prices'
import CallBack from './CallBack'
import OurWorks from './OurWorks'
import Feedback from './Feedback'
import Statistics from './Statistics'

const { Header, Sider, Content } = Layout;

export default class App extends Component {
	state = {
		collapsed: false,
		size: 'large',
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
		const { size } = this.state;
    return (
			<Router>
				<Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<h3 className="menu__title">Меню</h3>
							<Menu.Item key="1">
								<UserOutlined />
								<Link to={`/`}>Главная</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<UnorderedListOutlined />
								<Link to={`/orders`}>Заказы</Link>
            	</Menu.Item>
							<Menu.Item key="3">
								<DollarOutlined />
								<Link to={`/prices`}>Цены</Link>
            	</Menu.Item>
							<Menu.Item key="4">
								<PhoneOutlined />
								<Link to={`/call-back`}>Обратные звонки</Link>
							</Menu.Item>
							<Menu.Item key="5">
								<FileDoneOutlined />
								<Link to={`/ourworks`}>Наши работы</Link>
							</Menu.Item>
							<Menu.Item key="6">
								<LikeOutlined />
								<Link to={`/feedback`}>Отзывы</Link>
							</Menu.Item>
							<Menu.Item key="7">
								<BarChartOutlined />
								<Link to={`/statistics`}>Статистика</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="site-layout">
						<Header className="site-layout-background header" style={{ padding: 0 }}>
							<div className="header-left">
								<Button type="primary"
											icon={this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>} 
											size={size} onClick={this.toggle}
											className="header__button"/>
								<div className="header__title">
									<h1>Ремонт под ключ</h1>
									<span>панель администратора</span>
								</div>
							</div>
							<div className="header-right">
								<Popconfirm title="Вы уверенны что хотите выйти？" okText="Да" cancelText="Нет" placement="bottomRight">
									<Button type="primary"
												shape="circle"
												icon={<LogoutOutlined />} 
												size={size}
												className="header__logout"/>
								</Popconfirm>
							</div>
						</Header>
						<Content className="site-layout-background"style={{ margin: '24px 16px', padding: 24, minHeight: 710,}} >
							<Switch>
								<Route exact={true} path="/" component={Main} />
								<Route path="/orders" component={Orders} />
								<Route path="/prices" component={Prices} />
								<Route path="/call-back" component={CallBack} />
								<Route path="/ourworks" component={OurWorks} />
								<Route path="/feedback" component={Feedback} />
								<Route path="/statistics" component={Statistics} />		
							</Switch>			
						</Content>
					</Layout>
				</Layout>
			</Router>
    );
  }
}