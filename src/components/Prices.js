import React, { Component, useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Table, InputNumber, Form, message } from 'antd';

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
			{ title: 'id', dataIndex: 'id_price', key: 'id_price' },
			{ title: 'Покрытие', dataIndex: 'cover', key: 'cover' },
			{ title: 'Цена за 1 м2 в рублях', dataIndex: 'price', key: 'price' ,editable: true, },
    ];

    this.state = {
      prices: []
		};
  }
  
  componentDidMount() {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
		axios.get('https://api.rostovrepair161.ru/api/prices', config)
		.then( response => {
			this.setState({
				prices: response.data['prices'],
			});
		})
	}

  handleSave = (row) => {
    const priceObj = {
			price: row.price
		}

    const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('api_token')}`
			}
		};
    axios.post(`https://api.rostovrepair161.ru/api/edit-price/${row.id_price}`, priceObj, config)
    .then( response => {
			if (response.status === 200) {
				const newData = [...this.state.prices];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ prices: newData });
				message.success('Цена изменена!')
			}
		})
  };

  getRandom() {
		return Math.random();
	}
	
	render() {
		const { prices } = this.state;
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
          rowKey={this.getRandom}
          rowClassName={() => 'editable-row'}
					bordered
					pagination={false}
          dataSource={prices}
          columns={columns}
        />
      </div>
		)
	}
}
