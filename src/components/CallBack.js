import React, { Component } from 'react'
import { Table, Popconfirm, message } from 'antd';

export default class CallBack extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data : [
				{
					key: 1,
					id: 1,
					name: 'Иван Иванов',
					phone: '+79882522312',
				},
				{
					key: 2,
					id: 2,
					name: 'Петя Иванов',
					phone: '88005553535',
				},
				{
					key: 3,
					id: 3,
					name: 'Вася Иванов',
					phone: '2445251',
				},
				{
					key: 4,
					id: 5,
					name: ' Тимур Букраба',
					phone: '89996970211',
				},
			]
		}

		this.columns = [
			{ title: 'id', dataIndex: 'id', key: 'id' },
			{ title: 'Имя', dataIndex: 'name', key: 'name' },
			{ title: 'Номер телефона', dataIndex: 'phone', key: 'phone' },
			{
				title: 'Действия',
				dataIndex: '',
				key: 'x',
				render: (record) => 
				this.state.data.length >= 1 ? (
					<div>
						<Popconfirm title="Вы уверены что хотите удалить?" okText="Да" cancelText="Нет"
						onConfirm={() => this.handleDelete(record.key)}>
								<a href="/call-back">Удалить</a>
						</Popconfirm>
								<a href={`tel:` + record.phone } className='feedback__link' onClick={() => this.handlePhone()}>Позвонить</a>
					</div>
				) :null,
			},
		];
	
	}

	handleDelete = key => {
		const data = [...this.state.data];
		this.setState({ data: data.filter(item => item.key !== key) });
		message.warning('Номер удален');
	};

	handlePhone = () => {
		message.success('Набираем ...');
	}
	
	render() {
		const { data } = this.state;
		const columns = this.columns.map(col => {  return col; } )

		return (
			<div>
				<h2>Обратные звонки</h2>
				<Table columns={columns}
							 pagination={false}
    					 expandable={{
               rowExpandable: record => record.name !== 'Not Expandable',}}
               dataSource={data}/>
			</div>
		)
	}
}
