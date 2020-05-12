import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button,Form, Input, message} from 'antd';

import {LockOutlined, UserOutlined} from '@ant-design/icons';

class SingInForm extends Component {
	constructor(props) {
		super(props)

		this.onChangeLogin = this.onChangeLogin.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onFinish = this.onFinish.bind(this);
	
		this.state = { 
			login: '',
			password: '',
		}
	}

	onChangeLogin(e) {
		this.setState({ login: e.target.value })
	}

	onChangePassword(e) {
		this.setState({ password: e.target.value })
	}

	onFinish() {
		const userObject = {
			login: this.state.login,
			password: this.state.password,
		};
		axios.post('https://api.rostovrepair161.ru/api/login', userObject)
            .then((res) => {
							if (res.status === 200) {
								localStorage.setItem('api_token', res.data.api_token);
								localStorage.setItem('auth', true)
								this.props.isAuth(JSON.parse(localStorage.getItem('auth')));
								this.props.history.push('/')
							}
            }).catch((error) => {
              if (error.response.status === 404) {
								message.error('Неправильно указан логин или пароль!');
							}
							if (error.response.status === 422) {
								message.error('Данные не введины или указаны неправильно!');
							}
            });
		this.setState({ login: '', email: '' })
	};

	render() {
		return (
			<div className="logIn">
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
					onFinish={this.onFinish}
				>
					<h1>Ремонт под ключ</h1>
					<span className="login-form__desrpition">панель администратора</span>
					<Form.Item
						value={this.state.login}
						onChange={this.onChangeLogin}
						name="login"
						rules={[{ required: true, message: 'Пожалуйста, введите ваше имя логин!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
					</Form.Item>

					<Form.Item
						name="password"
						value={this.state.password}
						onChange={this.onChangePassword}
						rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Пароль"
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Войти
						</Button>
					</Form.Item>
    		</Form>
			</div>
		)
	}
}

const SignIn = withRouter(SingInForm);

export default SignIn;

export {SignIn};
