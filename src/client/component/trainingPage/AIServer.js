import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import {
    Typography,
    Button,
    Input,
    Table,
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

const AIServer = (props) => {
    const {
        loginInformation,
        eventList,
        getEventList
    } = props;

    const [time, setTime]= useState('fetching clock ...');
    const [message, setMessage]= useState('fetching AI Server message ...');
    const [sendToAI, setSendToAI]= useState('Hi AIServer ...');
    const [selectedRowKeys, setSelectedRowKeys]= useState([]);

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
    }, []);

    const onChangeInput = (e) => {
        setSendToAI(e.target.value)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
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

    const sendOnlyData = (c) => {
        if ((c.labeled == '1') && (c.image == '1') && (c.json == '1')) {
            return(
                <Button type="primary" icon={<SendOutlined />} />
            )
        } else {
            return(
                <Button type="primary" disabled icon={<SendOutlined />} />
            )
        }
    }

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
            <Title level={4} style={{ margin: 8 }}><MessageOutlined /> {message}</Title>
            <Table
                style={{ margin: 8 }}
                dataSource={FilterData(loginInformation.project)}
                rowSelection={rowSelection}
                pagination={{ position: ['bottomCenter'], pageSize: 5 }}
            >
                <Column
                    title='Image'
                    align="center"
                    render={findImageByDetail}
                    width='15%'
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
                <Column
                    title='操作'
                    render={sendOnlyData}
                    align="center"
                    width='10%'
                />
            </Table>
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