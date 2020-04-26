import React, { Component } from 'react'
import { Table, Popconfirm, message, Tag } from 'antd';

 export default class Feedback extends Component {
 	constructor(props) {
 		super(props)

 		this.state = {
 			data : [
 				{
 					key: 1,
 					id: 1,
 					name: 'Иван Иванов',
 					status: true,
 					feedback: 'Отличныя работа, буду всем советовать',
 				},
 				{
 					key: 2,
 					id: 2,
 					name: 'Петр Петров',
 					status: false,
 					feedback: 'Сделали крутой ремонт, спасибо большое',
 				},
 				{
 					key: 3,
 					id: 3,
 					name: 'Вася Смирнов',
 					status: true,
 					feedback: 'Быстро качетвенно, не дорого',
 				},
 			] 
 		}

 		this.columns = [
 				{ title: 'id', dataIndex: 'id', key: 'id' },
 				{ title: 'Имя', dataIndex: 'name', key: 'name' },
 				{ title: 'Отзыв', dataIndex: 'feedback', key: 'feedback' },
 				{
 					title: 'Статус',
 					dataIndex: 'status',
 					key: 'status',
 					render: val => val
  					? <Tag color="success">Активен</Tag>
  					: <Tag color="default">Не активен</Tag>
 				},
 				{
 					title: 'Действия',
 					dataIndex: '',
 					key: 'x',
 					render: (record) => 
 					this.state.data.length >= 1 ? (
 						<div>
 						<Popconfirm title="Вы уверены что хотите удалить?" okText="Да" cancelText="Нет"
 						onConfirm={() => this.handleDelete(record.key)}>
 								<a href="/feedback">Удалить</a>
 						</Popconfirm>
 						<Popconfirm title="Опубликовать отзыв на сайте?" okText="Да" cancelText="Нет"
 							onConfirm={() => this.handleTweet()}>
 								<a href="/feedback" className='feedback__link'>Опубликовать</a>
 						</Popconfirm>
 					</div>
 					) : null,
 				},
 			];

 	}

 	handleDelete = key => {
 		const data = [...this.state.data];
 		this.setState({ data: data.filter(item => item.key !== key) });
 		message.warning('Отзыв удален');
	 };

 	handleTweet = () => { 
 		message.success('Отзыв опубликован!')	
 	}

 	render() {
 		const { data } = this.state;
 		const columns = this.columns.map(col => {  return col; } )


 		return (
 			<div>
 				<h2>Отзывы</h2>
 				<Table columns={columns}
 							 pagination={false}
     					 expandable={{
                rowExpandable: record => record.name !== 'Not Expandable',}}
                dataSource={data}/>
 			</div>
 		)
 	}
 }