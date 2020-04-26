import React, { Component } from 'react'
import { Table, Popconfirm, Button, Form, Input, Upload, message} from 'antd';

import { UploadOutlined, CloseOutlined } from '@ant-design/icons';

export default class OurWorks extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data : [
				{
					key: 1,
					id: 1,
					photo: 'https://static.tildacdn.com/tild3163-6462-4237-b263-386637376164/DSC_0646_1.jpg',
					place: 'Ростов',
					description: 'Студия'
				},
				{
					key: 2,
					id: 2,
					photo: 'https://static.tildacdn.com/tild3539-3435-4933-a464-346533383132/1_37.JPG',
					place: 'Аксай',
					description: 'Студия'
				},
				{
					key: 3,
					id: 3,
					photo: 'https://grand-remont.com/images/remont_kvartir_spb_15.jpg',
					place: 'Батайск',
					description: 'Студия'
				},
			]
		}


		this.columns = [
			{ title: 'id', dataIndex: 'id', key: 'id' },
			{ title: 'Фото',
				 dataIndex: 'photo', 
				 key: 'photo',
				 render: val => 
				  <img alt='project' className='work__img' src={val} />
				 },
			{ title: 'Место', dataIndex: 'place', key: 'place' },
			{ title: 'Описание', dataIndex: 'description', key: 'description' },
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
	 onFinish = values => {
		console.log('Success:', values);
		const { data } = this.state;
		// console.log(values.upload[0].originFileObj);
		const newData = {
			key: 4,
			id: 4,
			image: `${values.upload[0].originFileObj.name}`,
      place: `${values.place}`,
      description: `${values.desc}`,
		};
		this.setState({
      data: [...data, newData],
    });
  };

   onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
	};
	
	normFile = e => {
		// console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	handleAdd = () => {
		let add = document.querySelector('.addWork');
		add.style.display = "block";	
	}

	handleClose = () => {
		let add = document.querySelector('.addWork');
		add.style.display = "none";	
	}
	
	render() {
		const { data } = this.state;
		const columns = this.columns.map(col => {  return col; } )
		 
		return (
			<div>
				<h2>Наши работы</h2>
				<Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginRight: 15}}>
          Добавить работу
        </Button>
				<Button shape="circle" icon={<CloseOutlined />} onClick={this.handleClose}/>
				<Table columns={columns}
 							 pagination={false}
     					 expandable={{
                rowExpandable: record => record.name !== 'Not Expandable',}}
                dataSource={data}/>
				<div className="addWork">
					<h3 className="work__formtitle">Добавить работу</h3>
					<Form
						name="basic"
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						className="work__form"
					>
						<Form.Item
							label="Место"
							name="place"
							rules={[{ required: true, message: 'Введите место!' }]}
						>
						<Input />
					</Form.Item>
					<Form.Item
						label="Описание"
						name="desc"
						rules={[{ required: true, message: 'Введите описание!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="upload"
						label="Загрузить"
						valuePropName="fileList"
						getValueFromEvent={this.normFile}
						rules={[{ required: true, message: 'Загрузите фото!' }]}
					>
						<Upload name="logo" action="/upload.do" listType="picture">
							<Button>
								<UploadOutlined /> Загрузить фото
							</Button>
						</Upload>
      		</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							 Принять
						</Button>
					</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}
