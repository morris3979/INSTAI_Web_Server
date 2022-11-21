import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import {
    Typography,
    Button,
    Input,
    Table,
    Transfer,
    Image
} from 'antd'
import {
    GetProjectTableData,
    GetEventList,
    PostAIServerMQTT
} from '../../store/actionCreater'
import {
    SendOutlined,
    RobotOutlined,
    CheckOutlined,
    CloseOutlined,
    MessageOutlined
} from '@ant-design/icons'
import { io } from 'socket.io-client'

const { Title } = Typography
const { Column } = Table

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
                pagination={{ position: ['bottomCenter'] }}
            >
                <Column
                    title='Data'
                    align="center"
                    render={findImageByDetail}
                    width='30%'
                />
                <Column
                    title='filename'
                    dataIndex='details'
                    align='center'
                    width='40%'
                />
                <Column
                    title='labeled'
                    render={checkLabeled}
                    align='center'
                    width='10%'
                />
                <Column
                    title='image'
                    render={checkImage}
                    align='center'
                    width='10%'
                />
                <Column
                    title='json'
                    render={checkJson}
                    align='center'
                    width='10%'
                />
            </Table>
        </Fragment>
      );
    }}
    </Transfer>
)

const AIServer = (props) => {
    const {
        loginInformation,
        eventList,
        getEventList
    } = props;

    const [time, setTime] = useState('fetching clock ...');
    const [message, setMessage] = useState('fetching AI Server message ...');
    const [sendToAI, setSendToAI] = useState('Hi AIServer ...');
    const [filterData, setFilterData] = useState([])
    const [targetKeys, setTargetKeys] = useState(originTargetKeys); // originTargetKeys

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
            setMessage(data)
        })
        socket.on('disconnect', () => {
            setTime('Clock disconnected ...')
            setMessage('AI Server disconnected ...')
        })

        FilterData(loginInformation.project).map((data, i) => {
            setFilterData((value) => [...value, {
                key: i.toString(),
                details: data.details,
                labeled: data.labeled,
                image: data.image,
                json: data.json,
            }])
        })
    }, []);

    const originTargetKeys = filterData
        .filter((item) => Number(item.key) % 3 > 1)
        .map((item) => item.key);

    const onChangeInput = (e) => {
        setSendToAI(e.target.value)
    }

    const FilterData = (value) => {
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
          return data.labeled == '1'
        })
        return labeledData
    }

    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys)
    }

    const rightTableColumns = [
        {
            dataIndex: 'details',
            title: 'Data',
            render: (text) =>
                <Image
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
    ];

    return (
        <Fragment>
            <span>
                <Title level={2} style={{ margin: 8 }}>{time}</Title>
            </span>
            <Input.Group compact style={{ margin: 8 }}>
                <Input
                    size="large"
                    style={{ width: '200px' }}
                    icon={<RobotOutlined />}
                    defaultValue={sendToAI}
                    onChange={onChangeInput}
                />
                <Button
                    size="large"
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() => { props.postAIServerMQTT(sendToAI) }}
                />
            </Input.Group>
            <Title level={4} style={{ margin: 12 }}><MessageOutlined /> {message}</Title>
            <TableTransfer
                titles={['Labeled Data Area', 'Data Waiting Area (To AI Server)']}
                showSearch
                targetKeys={targetKeys}
                dataSource={filterData}
                onChange={onChange}
                rightColumns={rightTableColumns}
            />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
        loginInformation: state.loginInformation,
        projectTableData: state.projectTableData,
        eventList: state.eventList
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