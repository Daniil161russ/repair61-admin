import React, { Component } from 'react'
import axios from 'axios'
import { Table, Popconfirm, message } from 'antd';

export default class CallBack extends Component {
	constructor(props) {
		super(props)

		this.state = {
			feedback : []
		}

		this.columns = [
			{ title: 'id', dataIndex: 'id_feedback', key: 'id_feedback' },
			{ title: 'Имя', dataIndex: 'name', key: 'name' },
			{ title: 'Номер телефона', dataIndex: 'phone', key: 'phone' },
			{
				title: 'Действия',
				dataIndex: '',
				key: 'x',
				render: (record) => 
				this.state.feedback.length >= 1 ? (
					<div>
						<Popconfirm title="Вы уверены что хотите удалить?" okText="Да" cancelText="Нет"
						onConfirm={() => this.handleDelete(record.id_feedback)}>
								<a href="/call-back">Удалить</a>
						</Popconfirm>
								<a href={`tel:` + record.phone } className='feedback__link' onClick={() => this.handlePhone()}>Позвонить</a>
					</div>
				) :null,
			},
		];
	
	}

	componentDidMount() {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.get('https://api.rostovrepair161.ru/api/feedback', config)
		.then( response => {
			this.setState({
				feedback: response.data['feedback'],
			});
		})
	}

	handleDelete = key => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.delete(`https://api.rostovrepair161.ru/api/remove-feedback/${key}`, config)
		.then( response => {
			if (response.status === 204) {
					const newList = this.state.feedback.filter(item => item.id_feedback !== key)
					this.setState({feedback: newList})
				message.warning('Обратный звонок удален');
			}
		})
	};

	handlePhone = () => {
		message.success('Набираем ...');
	}

	getRandom() {
		return Math.random();
	}
	
	render() {
		const { feedback } = this.state;
		const columns = this.columns.map((col) => {  return col; } )

		return (
			<div>
				<h2>Обратные звонки</h2>
				<Table
							columns={columns}
							pagination={false}
    					expandable={{
							rowExpandable: record => record.name !== 'Not Expandable',}}
							dataSource={feedback}
							rowKey={this.getRandom}
				/>
			</div>
		)
	}
}
