import React, { Component } from 'react'
import axios from 'axios';
import { Layout, Menu, Button, Popconfirm} from 'antd';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

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
import SingIn from './SingIn'

const { Header, Sider, Content } = Layout;

class Panel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedIn: true,
		}
		this.logOut = this.logOut.bind(this);
	}
	

	state = {
		collapsed: false,
		size: 'large',
	};

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
	};

	logOut () {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.post('https://api.rostovrepair161.ru/api/logout', {}, config)
			.then((res) => {
				if (res.status === 200) {
					localStorage.removeItem('api_token');
					localStorage.setItem('auth', false)
					this.props.isAuth(JSON.parse(localStorage.getItem('auth')));
					// this.props.history.push('/signin')
				}
			});
	}

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
								<Link to={ROUTES.MAIN}>Главная</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<UnorderedListOutlined />
								<Link to={ROUTES.ORDERS}>Заказы</Link>
            	</Menu.Item>
							<Menu.Item key="3">
								<DollarOutlined />
								<Link to={ROUTES.PRICES}>Цены</Link>
            	</Menu.Item>
							<Menu.Item key="4">
								<PhoneOutlined />
								<Link to={ROUTES.CALLBACK}>Обратные звонки</Link>
							</Menu.Item>
							<Menu.Item key="5">
								<FileDoneOutlined />
								<Link to={ROUTES.OURWORKS}>Наши работы</Link>
							</Menu.Item>
							<Menu.Item key="6">
								<LikeOutlined />
								<Link to={ROUTES.FEEDBACK}>Отзывы</Link>
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
								<Popconfirm title="Вы уверенны что хотите выйти？"
								 onConfirm={this.logOut} okText="Да" cancelText="Нет" placement="bottomRight">
									<Button type="primary"
												shape="circle"
												icon={<LogoutOutlined />} 
												size={size}
												className="header__logout"/>
								</Popconfirm>
							</div>
						</Header>
						<Content className="site-layout-background"style={{ margin: '24px 16px', padding: 24, minHeight: 710,}} >
								<Route exact path={ROUTES.MAIN} component={Main} />
								<Route path={ROUTES.ORDERS} component={Orders} />
								<Route path={ROUTES.PRICES} component={Prices} />
								<Route path={ROUTES.CALLBACK} component={CallBack} />
								<Route path={ROUTES.OURWORKS} component={OurWorks} />
								<Route path={ROUTES.FEEDBACK} component={Feedback} />		
						</Content>
					</Layout>
				</Layout>
			</Router>			
			);
  }
}

export default class App extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			user: props.userData,
			isLoggedIn: JSON.parse(localStorage.getItem('auth')),
		}
	}

	isAuth = (value) => {
    this.setState({ isLoggedIn: value })
	}
	
	render() {
		return (
			<Router>
				{this.state.isLoggedIn
					? <Panel isAuth={this.isAuth}/> 
					: <SingIn isAuth={this.isAuth}/> 			
				}
			</Router>
		);
	}
}
