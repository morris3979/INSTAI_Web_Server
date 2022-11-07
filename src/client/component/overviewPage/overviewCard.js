import React, { useEffect, Fragment } from "react";
import { connect } from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import {
    Col, Row, Card, Avatar, Image, Typography
} from 'antd'
import {
    GetDetailsData,
} from '../../store/actionCreater'
// import {
//     EditOutlined,
//     EllipsisOutlined,
//     SettingOutlined
// } from '@ant-design/icons'

const { Meta } = Card;
const { Title } = Typography;

const OverviewCard = (props) => {
    const {
        detailsData,
        getDetailsData,
    } = props

    useEffect(() => {
        getDetailsData()
    }, []);

    const CardData = (
        detailsData.map(c => {
            return(
                <Col>
                    <Card
                        style={{
                            width: 280,
                            margin: 2
                        }}
                        cover={
                            c.video == true && c.image == true?
                            <Fragment align='center'>
                                <ReactPlayer
                                    url={`https://d20cmf4o2f77jz.cloudfront.net/video/${c.details}.mp4`}
                                    controls={true}
                                    width='100%'
                                    height='100%'
                                />
                                <Image
                                    src={`https://d20cmf4o2f77jz.cloudfront.net/image/${c.details}.jpg`}
                                    width='100%'
                                    height='100%'
                                />
                            </Fragment>:'' ||
                            c.image == true?
                            <Image
                                src={`https://d20cmf4o2f77jz.cloudfront.net/image/${c.details}.jpg`}
                                width='100%'
                                height='100%'
                            />:'' ||
                            c.video == true?
                            <ReactPlayer
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
                                `rawData: ${c.rawData}\n`+
                                `cleaned: ${c.cleaned}\n`+
                                `labeled: ${c.labeled}\n`+
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

  return (
    <Fragment>
        <div className="site-card-wrapper" style={{ margin: 6 }}>
            <Title level={2} style={{ margin: 2 }}>共 {detailsData.length} 筆資料</Title>
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
    }
}

const mapDispatchToProps = (dispatch) => {
//dispatch指store.dispatch這個方法
    return {
        getDetailsData(){
          const action = GetDetailsData()
          dispatch(action)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewCard)