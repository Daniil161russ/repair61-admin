import React, { Component } from 'react'
import { Card, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const CardInfo = (props) => { 

	return(
		<Card style={{ width: 300, marginTop: 16, marginRight: 20 }} actions={[
			<CloseOutlined onClick={props.handleDelete} data-id={props.id}  key="delete" />, ]}>
			<h3>Заказ № {props.id}</h3>
			<div className="orders__info">
				<span>Имя: {props.name}</span>
				<span>Телефон: {props.phone}</span>
				<span>Тип объекта: {props.type}</span>
				<span>Состояние: {props.objstate}</span>
				<span>Площадь: {props.area}</span>
				<span>Дизайн-проект: {props.disign}</span>
				<span>Полы: {props.floor}</span>
				<span>Стены: {props.wall}</span>
				<span>Потолки: {props.ceiling}</span>
				<span>Цена: {props.price}</span>
			</div>
		</Card>
  );
}

const CardList = ({ cards, handleDelete }) => {
	return (
    	<div className="cards__list">
				 {cards.map(n => <CardInfo {...n} handleDelete={handleDelete} />)}
      </div>
    );
};

export default class Orders extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 data: [
				{
					key: 1,
					id: 1,
					name: 'Данил',
					phone: '88005553535',
					type: 'Квартира',
					objstate: 'Стройвариант',
					area: 220,
					disign: 1,
					floor : 'плитка',
					wall: 'Обои',
					ceiling: 'Гипсокартон',
					price: 240000
				},
				{
					key: 2,
					id: 2,
					name: 'Вася',
					phone: '89666666666',
					type: 'Дом',
					objstate: 'Стройвариант',
					area: 550,
					disign: 2,
					floor : 'Ламинат',
					wall: 'Обои',
					ceiling: 'Гипсокартон',
					price: 1000000
				}
			 ]
		}
	}
	
	handleDelete = e => {
		const id = +e.currentTarget.dataset.id;
		this.setState(({ data }) => ({
			data: data.filter(n => n.id !== id),
		}));
		message.warning('Заказ удален');
	}

	render() {
		return (
			<div className="orders">
				<h2>Заказы</h2>
				<CardList handleDelete={this.handleDelete} cards={this.state.data}/>
			</div>
		)
	}
}
