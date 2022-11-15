import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import {
    Typography,
    Button,
    Input
} from 'antd'
import {
    PostAIServerMQTT
} from '../../store/actionCreater'
import {
    SendOutlined,
    RobotOutlined
} from '@ant-design/icons'
import { io } from 'socket.io-client'

const { Title } = Typography;

const AIServer = (props) => {
    const {
    } = props

    const [time, setTime]= useState('fetching clock ...');
    const [message, setMessage]= useState('fetching AI Server ...');
    const [sendToAI, setSendToAI]= useState('Hi AIServer ...');

    useEffect(() => {
        const socket = io('http://localhost:8080')
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
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
//dispatch指store.dispatch這個方法
    return {
        postAIServerMQTT(data) {
          const action = PostAIServerMQTT(data)
          dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AIServer)