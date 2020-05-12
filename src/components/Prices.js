import React, { Component, useContext, useState, useEffect, useRef } from 'react'
import { Table, InputNumber, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} не задана.`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save}/>
        {/* <Input /> */}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class Prices extends Component {
	constructor(props) {
		super(props)

		this.columns = [
			{ title: 'id', dataIndex: 'id', key: 'id' },
			{ title: 'Покрытие', dataIndex: 'coating', key: 'coating' },
			{ title: 'Цена за 1 м2 в рублях', dataIndex: 'price', key: 'price' ,editable: true, },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          id: '1',
          coating: 'Ламинат',
          price: 100,
        },
        {
          key: '1',
          id: '2',
          coating: 'Паркетная доска',
          price: 200,
				},
				{
          key: '2',
          id: '3',
          coating: 'Керамогранит',
					price: 350,
				},
				{
          key: '3',
          id: '4',
          coating: 'Линолеум',
					price: 160,
				},
				{
          key: '4',
          id: '5',
          coating: 'Наливные полы',
					price: 500,
				},
				{
          key: '5',
          id: '6',
          coating: 'Краснка',
					price: 220,
				},
				{
          key: '6',
          id: '7',
          coating: 'Обои',
					price: 300,
				},
				{
          key: '7',
          id: '8',
          coating: 'Декор. штукатурка',
					price: 350,
				},
				{
          key: '8',
          id: '9',
          coating: 'Плитка',
					price: 300,
				},
				{
          key: '9',
          id: '10',
          coating: 'Натяжные потолки',
					price: 200,
				},
				{
          key: '10',
          id: '11',
          coating: 'Гипсокартон 1 ур.',
					price: 400,
				},
				{
          key: '11',
          id: '12',
          coating: 'Гипсокартон 2-3 ур.',
					price: 650,
        },
      ],
		};
	}

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };
	
	render() {
		const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
		};
		
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
		});
		
		return (
			<div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
					bordered
					pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
		)
	}
}
