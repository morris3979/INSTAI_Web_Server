import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import {
    Col,
    Row,
    Card,
    Avatar,
    Image,
    Typography,
    Carousel,
    Select,
    Checkbox,
    DatePicker
} from 'antd'
import {
    GetDetailsData,
    GetProjectList
} from '../../store/actionCreater'
// import {
//     EditOutlined,
//     EllipsisOutlined,
//     SettingOutlined
// } from '@ant-design/icons'
import { io } from 'socket.io-client'

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;
const border = {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
}

const OverviewCard = (props) => {
    const {
        detailsData,
        getDetailsData,
        loginInformation,
        getProjectList,
        projectList
    } = props

    const [selectedProject, setSelectedProject]= useState();
    const [selectedDate, setSelectedDate]= useState();
    const [checkValues, setCheckedValues]= useState([]);
    const [time, setTime]= useState('fetching clock ...');

    useEffect(() => {
        getDetailsData()
        getProjectList()
        // const interval = window.setInterval(() => {
        //     location.reload()
        // }, 30*1000)
        // return () => window.clearInterval(interval);
        const SERVER = ":8080";
        const socket = io(SERVER)
        socket.on('connect', () => console.log(socket.id))
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 5000)
        })
        socket.on('time', (data) => {
            setTime(data)
        })
        socket.on('disconnect', () => {
            setTime('Clock disconnected ...')
        })
    }, []);

    const filterData = detailsData.filter((data) => {
        if (loginInformation.user == true) {
            return data.Event.Device.Host.Project.project === loginInformation.project
        }
        else{
            if (selectedProject) {
                return data.Event.Device.Host.Project.project === selectedProject
            } else {
                return data
            }
        }
    })

    const isCleaned = (element) => element == 'cleaned';
    const isLabeled = (element) => element == 'labeled';
    const isTrained = (element) => element == 'trained';

    const DateFilter = filterData.filter((data) => {
        if(selectedDate){
            return data.createdAt.slice(0,10) === selectedDate
            // console.log(data.createdAt.slice(0,10))
        }
        else{
            return data
            // console.log(data.createdAt.slice(0,10))
        }
    })

    const checkValueFilter = DateFilter.filter((data) => {
        if((checkValues.findIndex(isCleaned)!=-1)&&(checkValues.findIndex(isLabeled)!=-1)&&(checkValues.findIndex(isTrained)!=-1)){
            return data.cleaned == true && data.labeled == true && data.trained == true
        }
        else if(checkValues.findIndex(isCleaned)!=-1){
            return data.cleaned == true
        }
        else if(checkValues.findIndex(isLabeled)!=-1){
            return data.labeled == true
        }
        else if(checkValues.findIndex(isTrained)!=-1){
            return data.trained == true
        }
        else{
            return data
        }
    })

    const CardData = (
        checkValueFilter.map(c => {
            return(
                <Col>
                    <Card
                        style={{
                            width: 270,
                            margin: 6,
                            ...border,
                        }}
                        cover={
                            c.video == true && c.image == true?
                            <Carousel effect='fade' dotPosition='top'>
                                <ReactPlayer
                                    style={{ borderRadius: '12px' }}
                                    url={`https://d20cmf4o2f77jz.cloudfront.net/video/${c.details}.mp4`}
                                    controls={true}
                                    width='100%'
                                    height='100%'
                                />
                                <Image
                                    style={ border }
                                    src={`https://d20cmf4o2f77jz.cloudfront.net/image/${c.details}.jpg`}
                                    width='100%'
                                    height='100%'
                                />
                            </Carousel>:'' ||
                            c.image == true?
                            <Image
                                style={ border }
                                src={`https://d20cmf4o2f77jz.cloudfront.net/image/${c.details}.jpg`}
                                width='100%'
                                height='100%'
                            />:'' ||
                            c.video == true?
                            <ReactPlayer
                                style={{ borderRadius: '12px' }}
                                url={`https://d20cmf4o2f77jz.cloudfront.net/video/${c.details}.mp4`}
                                controls={true}
                                width='100%'
                                height='100%'
                            />:''
                        }
                        // actions={[
                        //     <SettingOutlined key="setting" />,
                        //     <EditOutlined key="edit" />,
                        //     <EllipsisOutlined key="ellipsis" />,
                        // ]}
                    >
                        <Meta
                            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                            avatar={<Avatar src="https://cdn.pixabay.com/photo/2015/12/22/03/35/store-1103556_1280.png" />}
                            description={
                                `Project: ${c.Event.Device.Host.Project.project} (${c.Event.Device.Host.Project.displayName})\n`+
                                `Host: ${c.Event.Device.Host.serialNumber}\n`+
                                `Device: ${c.Event.Device.deviceId} (${c.Event.Device.deviceName})\n`+
                                `filename: ${c.details}\n`+
                                `image: ${c.image}\n`+
                                `video: ${c.video}\n`+
                                `json: ${c.json}\n`+
                                `csv: ${c.csv}\n`+
                                `rawData: ${c.rawData}\n`+
                                `cleaned: ${c.cleaned}\n`+
                                `labeled: ${c.labeled}\n`+
                                `trained: ${c.trained}\n`+
                                `createdAt: ${c.createdAt.replace('T',' ').replace('.000Z','')}`
                            }
                        />
                    </Card>
                </Col>
            )
        })
    )

    const CardRow = (
        <Row>
            {CardData}
        </Row>
    )

    const handleSelect = (value) => {
        //console.log(value)
        setSelectedProject(value)
    }

    const onChange_checkBox = (checkedValues) => {
        // console.log('checked ', checkedValues);
        setCheckedValues(checkedValues)
    };

    const options = [
        {
          label: 'cleaned',
          value: 'cleaned',
        },
        {
          label: 'labeled',
          value: 'labeled',
        },
        {
          label: 'trained',
          value: 'trained',
        },
    ];

  return (
    <Fragment>
        <div className="site-card-wrapper" style={{ margin: 6 }}>
            <span>
                <Title level={2} style={{ margin: 6 }}>Total {checkValueFilter.length} Records，{time}</Title>
            </span>
            <span>
                <Select
                    style={{ margin: 6, width: '200px' }}
                    placeholder='Please Select project'
                    hidden={!(loginInformation.developer || loginInformation.admin)}
                    onChange={handleSelect}
                    allowClear
                >
                    {projectList.map((c) => {
                        return( <Option value={`${c.project}`}>{`${c.displayName}`}</Option> )
                    })}
                </Select>
                <DatePicker
                    style={{ margin: 6 }}
                    onChange={(date, dateString) => {
                        // console.log(dateString);
                        setSelectedDate(dateString)
                    }}
                />
                <Checkbox.Group
                    style={{ margin: 6 }}
                    options={options}
                    onChange={onChange_checkBox}
                />
            </span>
            {CardRow}
        </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
    //state指的是store裡的數據
    return {
      loginInformation: state.loginInformation,
      detailsData: state.detailsData,
      projectList: state.projectList,
    }
}

const mapDispatchToProps = (dispatch) => {
//dispatch指store.dispatch這個方法
    return {
        getDetailsData(){
            const action = GetDetailsData()
            dispatch(action)
        },
        getProjectList() {
            const action = GetProjectList()
            dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewCard)