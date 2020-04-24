import React, { Component } from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class OurWorks extends Component {
	render() {
		return (
			<div>
				<h2>Наши работы</h2>
				<div className="works">
					<Card hoverable
							style={{ width: 240 }} className="work__card" 
							actions={[
								<EditOutlined key="edit" />,
								<DeleteOutlined key="delete"  onClick={() => this.handleDelete()}/>,
							]}
    					cover={<img alt="example" src="https://static.tildacdn.com/tild3163-6462-4237-b263-386637376164/DSC_0646_1.jpg" />}>
   			 		<Meta title="Новочеркаск" description="Студия" />
  				</Card>
					<Card hoverable
							style={{ width: 240 }} className="work__card" key="2"
							actions={[
								<EditOutlined key="edit" />,
								<DeleteOutlined key="delete" />,
							]}
    					cover={<img alt="example" src="https://static.tildacdn.com/tild3539-3435-4933-a464-346533383132/1_37.JPG" />}>
   			 		<Meta title="Аксай" description="Студия" />
  				</Card>
					<Card hoverable
							style={{ width: 240 }} className="work__card" key="3"
							actions={[
								<EditOutlined key="edit" />,
								<DeleteOutlined key="delete" />,
							]}
    					cover={<img alt="example" src="https://grand-remont.com/images/remont_kvartir_spb_15.jpg" />}>
   			 		<Meta title="Ростов" description="Студия" />
  				</Card>
					<Card hoverable
							style={{ width: 240 }} className="work__card" key="4"
							actions={[
								<EditOutlined key="edit" />,
								<DeleteOutlined key="delete" />,
							]}
    					cover={<img alt="example" src="https://i.simpalsmedia.com/999.md/BoardImages/900x900/e687a6a5288e877e4720f2c430e06c3f.jpg" />}>
   			 		<Meta title="Ростов" description="Спальня" />
  				</Card>
					<Card hoverable
							style={{ width: 240 }} className="work__card" key="5"
							actions={[
								<EditOutlined key="edit" />,
								<DeleteOutlined key="delete" />,
							]}
    					cover={<img alt="example" src="https://static.tildacdn.com/tild3163-6462-4237-b263-386637376164/DSC_0646_1.jpg" />}>
   			 		<Meta title="Новочеркаск" description="Студия" />
  				</Card>
				</div>
			</div>
		)
	}
}
