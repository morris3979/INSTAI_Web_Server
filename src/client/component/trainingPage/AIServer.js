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
} from '@ant-design/icons'
import { io } from 'socket.io-client'

const { Title } = Typography
const { Column } = Table

const AIServer = (props) => {
    const {
        loginInformation,
        eventList,
        getEventList
    } = props;

    const [time, setTime]= useState('fetching clock ...');
    const [message, setMessage]= useState('fetching AI Server ...');
    const [sendToAI, setSendToAI]= useState('Hi AIServer ...');

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

    const rowSelection = {};

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
        const EachDetailData = DataArray.filter((e) => {
          return (
            loginInformation.user == true?
            e.details.slice(0,8) == value:
            e.details.slice(0,8)
          )
        })
        const CleanedData = EachDetailData.filter((data) => {
          return data.labeled == '1'
        })
        return CleanedData
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

    const checkJson = (text) => {
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

    const sendOnlyData = (text) => {
        return(<Button type="primary" icon={<SendOutlined />} />)
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
            <Title level={4} style={{ margin: 8 }}>response: {message}</Title>
            <Table
                dataSource={FilterData(loginInformation.project)}
                // loading={tableStatus}
                style={{ margin: 8 }}
                rowSelection={rowSelection}
            >
                <Column
                    title='Image'
                    align="center"
                    render={findImageByDetail}
                    width='15%'
                />
                <Column
                    title='FileName'
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