import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from 'react-redux'
import {
    Typography,
    Button,
    Input,
    Table,
    Transfer,
    Image,
    Divider,
    Select,
    Space,
    message,
    Drawer
} from 'antd'
import {
    GetProjectTableData,
    GetEventList,
    PostAIServerMQTT
} from '../../store/actionCreater'
import {
    SendOutlined,
    CheckOutlined,
    CloseOutlined,
    MessageOutlined,
    PlusOutlined,
    ReloadOutlined
} from '@ant-design/icons'
import { io } from 'socket.io-client'

const { Title } = Typography
const { Column } = Table
const border = {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
}

const checkLabeled = (text) => {
    if (text.labeled == true) {
        return (
            <CheckOutlined />
        )
    } else {
        return (
            <CloseOutlined />
        )
    }
}

const checkImage = (text) => {
    if (text.image == true) {
        return (
            <CheckOutlined />
        )
    } else {
        return (
            <CloseOutlined />
        )
    }
}

const checkJson = (text) => {
    if (text.json == true) {
        return (
            <CheckOutlined />
        )
    } else {
        return (
            <CloseOutlined />
        )
    }
}

const findImageByDetail = (text) => {
    return (
        <Fragment align='center'>
            <Image
                style={ border }
                src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text.details}.jpg`}
                width='100%'
                height='100%'
            />
        </Fragment>
    )
}

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} style={{ margin: 5 }}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Fragment>
            <Button style={{ margin: 5 }} icon={<ReloadOutlined />} onClick={() => location.reload()} />
            <Table
                style={{
                    pointerEvents: listDisabled ? 'none' : undefined,
                }}
                onRow={({ key, disabled: itemDisabled }) => ({
                    onClick: () => {
                        if (itemDisabled || listDisabled) return;
                        onItemSelect(key, !listSelectedKeys.includes(key));
                    },
                })}
                dataSource={filteredItems}
                rowSelection={rowSelection}
                columns={columns}
                scroll={{ x: 500, y: 800 }}
                pagination={{ position: ['bottomCenter'], pageSize: 4 }}
            >
                <Column
                    title='Data'
                    align="center"
                    render={findImageByDetail}
                    width='20%'
                />
                <Column
                    title='filename'
                    dataIndex='details'
                    align='center'
                    width='30%'
                />
                <Column
                    title='labeled'
                    render={checkLabeled}
                    align='center'
                    width='15%'
                />
                <Column
                    title='image'
                    render={checkImage}
                    align='center'
                    width='15%'
                />
                <Column
                    title='json'
                    render={checkJson}
                    align='center'
                    width='15%'
                />
            </Table>
        </Fragment>
      );
    }}
    </Transfer>
)

const rightTableColumns = [
    {
        dataIndex: 'details',
        title: 'Data',
        render: (text) =>
            <Image
                style={ border }
                src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text}.jpg`}
                width='100%'
                height='100%'
            />,
        align: 'center',
        width: '20%'
    },
    {
        dataIndex: 'details',
        title: 'filename',
        align: 'center',
        width: '50%'
    },
    {
        dataIndex: 'image',
        title: 'image',
        render: (text) => {
            if (text == true) {
                return (
                    <CheckOutlined />
                )
            } else {
                return (
                    <CloseOutlined />
                )
            }
        },
        align: 'center',
        width: '15%'
    },
    {
        dataIndex: 'json',
        title: 'json',
        render: (text) => {
            if (text == true) {
                return (
                    <CheckOutlined />
                )
            } else {
                return (
                    <CloseOutlined />
                )
            }
        },
        align: 'center',
        width: '15%'
    },
]

const AIServer = (props) => {
    const {
        loginInformation,
        eventList,
        getEventList
    } = props;

    const inputRef = useRef(null);

    const [time, setTime] = useState('fetching clock ...');
    const [messageFromAIServer, setMessageFromAIServer] = useState('fetching AI Server message ...');
    const [sendToAI, setSendToAI] = useState();
    const [filterLabeledData, setFilterLabeledData] = useState([])
    const [filterTrainedData, setFilterTrainedData] = useState([])
    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const [selectLabeledData, setSelectLabeledData] = useState([])
    const [items, setItems] = useState(['Hi AIServer', 'Download']);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEventList()
        const SERVER = ":8080";
        const socket = io(SERVER)
        socket.on('connect', () => console.log(socket.id))
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 5000)
        })
        socket.on('time', (data) => {
            setTime(data)
        })
        socket.on('message', (data) => {
            setMessageFromAIServer(data)
        })
        socket.on('disconnect', () => {
            setTime('Clock disconnected ...')
            setMessageFromAIServer('AI Server disconnected ...')
        })

        FilterLabeledData(loginInformation.project).map((data, i) => {
            setFilterLabeledData((value) => [...value, {
                key: i.toString(),
                details: data.details,
                labeled: data.labeled,
                image: data.image,
                json: data.json,
            }])
        })

        FilterTrainedData(loginInformation.project).map((data, i) => {
            setFilterTrainedData((value) => [...value, {
                key: i.toString(),
                details: data.details,
                trained: data.trained,
                image: data.image,
                json: data.json,
            }])
        })
    }, []);

    const originTargetKeys = filterLabeledData
        .filter((item) => Number(item.key) % 3 > 1)
        .map((item) => item.key)

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const onSelected = (value) => {
        setSendToAI(value)
    }

    const FilterLabeledData = (value) => {
        const response = eventList.filter((c) => {
          return c.Details
        })
        const FilterDetails = response.map((d) => {
          return d.Details
        })
        const DataArray = [].concat(...FilterDetails);
        const EachDetailsData = DataArray.filter((e) => {
          return (
            loginInformation.user == true?
            e.details.slice(0,8) == value:
            e.details.slice(0,8)
          )
        })
        const labeledData = EachDetailsData.filter((data) => {
          return data.labeled == '1' && data.trained == '0'
        })
        return labeledData
    }

    const FilterTrainedData = (value) => {
        const response = eventList.filter((c) => {
          return c.Details
        })
        const FilterDetails = response.map((d) => {
          return d.Details
        })
        const DataArray = [].concat(...FilterDetails);
        const EachDetailsData = DataArray.filter((e) => {
          return (
            loginInformation.user == true?
            e.details.slice(0,8) == value:
            e.details.slice(0,8)
          )
        })
        const trainedData = EachDetailsData.filter((data) => {
          return data.trained == '1'
        })
        return trainedData
    }

    const onChange = (nextTargetKeys) => {
        setSelectLabeledData([])
        setTargetKeys(nextTargetKeys)
        nextTargetKeys.map(value => {
            const filename = filterLabeledData[value].details
            setSelectLabeledData((value) => [...value, filename])
        })
    }

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const send = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const trainedRowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Fragment>
            <span>
                <Title level={2} style={{ margin: 8 }}>{time}</Title>
            </span>
            <div style={{ margin: 8 }}>
                <Select
                    size="large"
                    style={{ width: 300, ...border }}
                    placeholder="Select Command to AI Server"
                    dropdownRender={(menu) => (
                        <div>
                            {menu}
                            <Divider
                                style={{
                                    margin: '8px 0',
                                }}
                            />
                            <Space
                                style={{
                                    padding: '0 8px 4px',
                                }}
                            >
                                <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={name}
                                    onChange={onNameChange}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                    Add item
                                </Button>
                            </Space>
                        </div>
                    )}
                    options={items.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                    onChange={onSelected}
                />
                <Button
                    style={{
                        borderTopRightRadius: '12px',
                        borderBottomRightRadius: '12px',
                    }}
                    size="large"
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() => {
                        if (!sendToAI) {
                            message.warning('Please Select Command !')
                        } else if (sendToAI == 'Download') {
                            selectLabeledData.length == '0'?
                            message.warning('Please Select Data to Data Waiting Area !'):
                            props.postAIServerMQTT(sendToAI+`;[${selectLabeledData}]`)
                        } else {
                            props.postAIServerMQTT(sendToAI)
                        }
                    }}
                />
            </div>
            <Title level={4} style={{ margin: 12 }}><MessageOutlined /> {messageFromAIServer}</Title>
            <TableTransfer
                titles={['Labeled Data Area', 'Data Waiting Area (To AI Server)']}
                // showSearch
                targetKeys={targetKeys}
                dataSource={filterLabeledData}
                onChange={onChange}
                rightColumns={rightTableColumns}
            />
            <Button
                type="primary"
                size="large"
                onClick={showDrawer}
                style={{ margin: 8, ...border }}
            >
                Trained Data
            </Button>
            <Drawer
                title="Trained Data"
                placement="right"
                size="large"
                onClose={onClose}
                open={open}
                extra={
                <Space>
                    <Button
                        onClick={onClose}
                        style={ border }
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={onClose}
                        style={ border }
                    >
                        OK
                    </Button>
                </Space>
                }
            >
                <div
                    style={{
                    marginBottom: 16,
                    }}
                >
                    <Button
                        type="primary"
                        onClick={send}
                        disabled={!hasSelected}
                        loading={loading}
                        style={ border }
                    >
                        Send
                    </Button>
                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={trainedRowSelection} columns={rightTableColumns} dataSource={filterTrainedData} />
            </Drawer>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        loginInformation: state.loginInformation,
        projectTableData: state.projectTableData,
        eventList: state.eventList,
        tableStatus: state.tableStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    //dispatch指store.dispatch這個方法
    return {
        getProjectTableData() {
          const action = GetProjectTableData()
          dispatch(action)
        },
        getEventList() {
          const action = GetEventList()
          dispatch(action)
        },
        postAIServerMQTT(data) {
            const action = PostAIServerMQTT(data)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AIServer)