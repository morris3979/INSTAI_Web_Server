import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Typography, Image } from 'antd'
import { DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'
import { GetEventList, } from '../../store/actionCreater'
const { Column } = Table
const { Text } = Typography

const video = (text) => {
  if(text.video == true){
    return (
      <Fragment align='center'>
        <ReactPlayer
          url={`https://d20cmf4o2f77jz.cloudfront.net/video/${text.details}.mp4`}
          controls={true}
          position='relative'
          width='100%'
          height='100%'
        />
        <Text>{text.details}</Text>
      </Fragment>
    )
  }
  else if(text.image == true){
    return (
      <Fragment align='center'>
        <Image
          src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text.details}.jpg`}
          controls={true}
          position='relative'
          width='100%'
          height='100%'
        />
        <Text>{text.details}</Text>
      </Fragment>
    )
  }
}

const checkRawData = (text) => {
  if (text.rawData == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

const checkCleaned = (text) => {
  if (text.cleaned == true) {
    return (
      <CheckOutlined />
    )
  } else {
    return (
      <CloseOutlined />
    )
  }
}

const download = (data) => {
  return (
    <Fragment>
      <Button icon={<DownloadOutlined />} />
    </Fragment>
  )
}

const reportTable = (props) => {
  const {
    whichDeviceName,
    eventList,
    getEventList,
  } = props

  useEffect(() => {
    getEventList()
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const eventData1 = (text) => {
    let string = '';
    string = text.replace('T',' ').replace('.000Z','')
    return string;
  };

  const convertTrigger = (value) => {
    if (value == true){
      return '1'
    }
    else if(value == false){
      return '0'
    }
  };

  const getEventDataId = (data, id) => {
    const convertedData = data.filter((c) => {
      return c.DeviceId == id
    })
    return convertedData
  }

  eventList.forEach((array) => {
    array.key = `${array.id}`
  })

  const expandedRowRender = (props) => {
    const Time = props.eventTime

    const EventFilter = (text) => {
      const EachEventData = eventList.filter((c) => {
        return c.eventTime === text
      });

      const DetailsData = EachEventData.map((d) => {
        return d.Details
      })

      const JSONData =  JSON.parse(JSON.stringify(DetailsData))
      return JSONData[0]
    }

    return (
      <Fragment>
        <Table
        dataSource={EventFilter(Time)}
        rowSelection={rowSelection}
        pagination={{ position: ['bottomCenter'], pageSize: 1 }}
        >
          <Column
              title='採集資料'
              render={video}
              // ellipsis={true}
              width='40%'
              align='center'
          />
          <Column
              title='rawData'
              render={checkRawData}
              align='center'
          />
          <Column
              title='cleaned'
              render={checkCleaned}
              align='center'
          />
          <Column
              title='操作'
              render={download}
              width='15%'
              align='center'
          />
        </Table>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <Table
        expandable={{
          expandedRowRender,
        }}
        dataSource={getEventDataId(eventList,whichDeviceName)}
      >
        <Column
            title='事件時間'
            dataIndex='eventTime'
            ellipsis={true}
            align='center'
            render={eventData1}
        />
        <Column
            title='觸發 (0:主動, 1:被動)'
            dataIndex='trigger'
            ellipsis={true}
            align='center'
            render={convertTrigger}
        />
        <Column
          title='選取數量'
          render={() =>
            <span
              style={{
              marginLeft: 8,
              }}
            >
              {hasSelected ? `${selectedRowKeys.length}` : '0'}
            </span>
          }
          width='15%'
          align='center'
        />
        <Column
            title='操作'
            render={() =>
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                send
              </Button>}
            width='15%'
            align='center'
        />
      </Table>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    eventList: state.eventList,
    whichDeviceName: state.whichDeviceName
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getEventList(){
      const action = GetEventList()
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reportTable)