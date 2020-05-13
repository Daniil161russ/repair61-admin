import React, { Component } from 'react'
import axios from 'axios'
import { Table, Popconfirm, message, Tag } from 'antd';

 export default class Feedback extends Component {
 	constructor(props) {
 		super(props)

 		this.state = {
			reviews : [] 
 		}

 		this.columns = [
 				{ title: 'id', dataIndex: 'id_review', key: 'id_reviews' },
 				{ title: 'Имя', dataIndex: 'name', key: 'name' },
 				{ title: 'Отзыв', dataIndex: 'text', key: 'text' },
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
 					this.state.reviews.length >= 1 ? (
 						<div>
							<Popconfirm title="Вы уверены что хотите удалить?" okText="Да" cancelText="Нет"
							onConfirm={() => this.handleDelete(record.id_review)}>
									<a href="/feedback">Удалить</a>
							</Popconfirm>
							<Popconfirm title="Опубликовать отзыв на сайте?" okText="Да" cancelText="Нет"
								onConfirm={() => this.handleTweet(record.status , record.id_review)}>
									<a href="/feedback" className='feedback__link'>{record.status ? 'Снять' : 'Опубликовать'}</a>
							</Popconfirm>
 						</div>
 					) : null,
 				},
 			];

	 }
	 
	componentDidMount() {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.get('https://api.rostovrepair161.ru/api/reviews', config)
		.then( response => {
			this.setState({
				reviews: response.data['reviews'],
			});
		})
	}

 	handleDelete = key => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.delete(`https://api.rostovrepair161.ru/api/remove-review/${key}`, config)
		.then( response => {
			if (response.status === 204) {
				const newList = this.state.reviews.filter(item => item.id_review !== key)
				this.setState({reviews: newList})
				message.warning('Отзыв удален');
			}
		})
	 };

 	handleTweet = (status, id) => {
		if ( status === 1){
			status = 0
		} else {
			status = 1
		}
		const statusObj = {
			status: status
		}
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.post(`https://api.rostovrepair161.ru/api/edit-status/${id}`, statusObj, config)
		.then( response => {
			if (response.status === 200) {
				const reviews = [...this.state.reviews];
				
				this.setState({ reviews : reviews.map(reviews => ({
					...reviews,
					status: reviews.id_review === id ? !reviews.status : reviews.status
				}))})
				message.success('Статус изменен!')
			}
		})
	 }
	 
	 getRandom() {
		return Math.random();
	}

 	render() {
 		const { reviews } = this.state;
 		const columns = this.columns.map(col => {  return col; } )

 		return (
 			<div>
 				<h2>Отзывы</h2>
 				<Table columns={columns}
							 pagination={false}
							 rowKey={this.getRandom}
     					 expandable={{
               rowExpandable: record => record.name !== 'Not Expandable',}}
               dataSource={reviews}/>
 			</div>
 		)
 	}
 }