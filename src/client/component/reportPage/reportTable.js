import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button,
  Typography,
  Image,
  Modal,
  Switch,
  Space,
  DatePicker
} from 'antd'
import {
  DownloadOutlined,
  CheckOutlined,
  CloseOutlined,
  FileOutlined,
} from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'
import {
  GetEventList,
  PatchDetailsTableData,
  DownloadImage,
  DownloadVideo,
  DownloadCsvFile,
} from '../../store/actionCreater'
import Papa from 'papaparse';

const { Column } = Table
const { Text } = Typography

const video = (text) => {
  if (text.image == true && text.video == true) {
    return (
      <Fragment align='center'>
        <Image
          style={{ margin: 2 }}
          src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text.details}.jpg`}
          width='100%'
          height='100%'
        />
        <ReactPlayer
          style={{ margin: 2 }}
          url={`https://d20cmf4o2f77jz.cloudfront.net/video/${text.details}.mp4`}
          controls={true}
          width='100%'
          height='100%'
        />
        <Text>{text.details}</Text>
      </Fragment>
    )
  } else if (text.image == true) {
    return (
      <Fragment align='center'>
        <Image
          src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text.details}.jpg`}
          width='100%'
          height='100%'
        />
        <Text>{text.details}</Text>
      </Fragment>
    )
  } else if (text.video == true) {
    return (
      <Fragment align='center'>
        <ReactPlayer
          url={`https://d20cmf4o2f77jz.cloudfront.net/video/${text.details}.mp4`}
          controls={true}
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

const reportTable = (props) => {
  const {
    whichDeviceName,
    eventList,
    getEventList,
    patchDetailsTableData,
    downloadCsvFile
  } = props

  useEffect(() => {
    getEventList()
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedDetailsId, setSelectedDetailsId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsText,setDetailsText] = useState([])
  const [detailsID, setDetailsID] = useState([])
  const [eventID, setEventID] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [csvData, setCsvData] = useState([])
  const [csvFilename, setCsvFilename] = useState()
  const [selectedDate, setSelectedDate]= useState();

  const download = (data) => {
    return (
      <Fragment>
        <Space>
        {
          data.cleaned == true?
          <Button
            size='large'
            icon={<DownloadOutlined />}
            onClick={() => {
              if (data.image == true && data.video == true) {
                props.downloadImage(data.details)
                props.downloadVideo(data.details)
              } else if (data.image == true) {
                props.downloadImage(data.details)
              } else if (data.video == true) {
                props.downloadVideo(data.details)
              } else {
                console.log('data: ', data)
              }
            }}
          />:
          <Button
            disabled
            size='large'
            icon={<DownloadOutlined />}
          />
        }
        {
          data.csv == true?
          <Button
            size='large'
            icon={<FileOutlined />}
            onClick={() => csv_onClick(data.details)}
          />:
          <Button
            disabled
            size='large'
            icon={<FileOutlined />}
          />
        }
        </Space>
      </Fragment>
    )
  }

  const value2cleaned = (value) => {
    if(value == true){
      const cleaned = { cleaned : '1' }
      return cleaned
    }else{
      const cleaned = { cleaned : '0' }
      return cleaned
    }
  }

  const start = () => {
    const eventId = eventList.filter((array) => {
      return array.id == eventID
    })
    const details = eventId.map((array) => {
      return array.Details
    })
    const detailsId = details[0].map((array) => {
      return array.id
    })
    const results = detailsText.filter((c) => {
      if (detailsId.includes(c.id)){
        return c
      }
    })
    results.map((element) => {
      patchDetailsTableData(element.id,value2cleaned(element.text))
    })
    setLoading(true); // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setDetailsText([]);
      setDetailsID([])
      setLoading(false);
    }, 1000);
    Modal.success({
      title: '修改成功',
      onOk: () => {
      }
    })
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
    const DateFilter = convertedData.filter((data) => {
      if(selectedDate){
          return data.eventTime.slice(0,10) === selectedDate
          // console.log(data.createdAt.slice(0,10))
      }
      else{
          return data
          // console.log(data.createdAt.slice(0,10))
      }
  })
    return DateFilter
  }

  eventList.forEach((array) => {
    array.key = `${array.id}`
  })

  const setValue = (id,value) => {
    setDetailsText([...detailsText, { id: id, text: value }])
  }

  const setID =(id) => {
    setDetailsID([...detailsID, id])
  }

  const DetailsFilter = (data) => {
    const DetailsData = data.map((d) => {
      return d.id
    })
    const JSONData =  JSON.parse(JSON.stringify(DetailsData))
    return JSONData
  }

  const selectedDataId = (array) => {
    const found = array.find(element => element == selectedRowKeys[0])
    return found
  }

  const selectedDataCleaned = (array) => {
    const found = array.find(element => element == detailsID[detailsID.length-1])
    return found
  }

  const csv_onClick = (text) => {
    setIsModalVisible(true)
    setCsvFilename(text)
    Papa.parse(`https://d20cmf4o2f77jz.cloudfront.net/csv/${text}.csv`, {
      download: true,
      complete: function(results) {
        results.data.shift()
        results.data.map((c) => {
          setCsvData((value) => [...value, {
            index: c[0],
            center_x: c[1],
            center_y: c[2],
            width: c[3],
            height: c[4],
            type: c[5],
            confidence_level: c[6]
          }])
        })
      }
    })
  }

  const ModalCancel = () => {
    setIsModalVisible(false)
    setCsvData([])
  }

  const onExpand = (props,record) => {
    if(props){
      const EventFilter = () => {
        const EachEventData = eventList.filter((c) => {
          return c.eventTime === record.eventTime
        });

        const DetailsData = EachEventData.map((d) => {
          return d.Details
        })

        const JSONData =  JSON.parse(JSON.stringify(DetailsData))[0]
        JSONData.forEach((array) => {
          array.key = array.id
        })
        return JSONData
      }
      const DetailsId = EventFilter(record.eventTime).map((c) => {
        return c.id
      })
      setSelectedDetailsId(DetailsId)
    }
  }

  const expandedRowRender = (props) => {
    const Time = props.eventTime
    const EventFilter = (text) => {
      const EachEventData = eventList.filter((c) => {
        return c.eventTime === text
      });

      const DetailsData = EachEventData.map((d) => {
        return d.Details
      })

      const JSONData =  JSON.parse(JSON.stringify(DetailsData))[0]
      JSONData.forEach((array) => {
        array.key = array.id
      })
      return JSONData
    }

    const downloadCsv = () => {
      downloadCsvFile(csvFilename)
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
              render={(text) => {
                if (text.cleaned == true) {
                  return (
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                      onChange={(e) => {
                        setID(text.id)
                        setValue(text.id,e)
                      }}
                    />
                  );
                } else {
                  return (
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      onChange={(e) => {
                        setID(text.id)
                        setValue(text.id,e)
                      }}
                    />
                  )
                }
              }}
              align='center'
          />
          <Column
            title='操作'
            render={download}
            width='15%'
            align='center'
          />
        </Table>
        <Modal
          visible={isModalVisible}
          onCancel={ModalCancel}
          footer={null}
          destroyOnClose={true}
          width={800}
        >
          <div>
          <Table
          dataSource={csvData}
          pagination={{ position: ['bottomCenter'] }}>
            <Column
              title='index'
              dataIndex='index'
              width='15%'
              align='center'
            />
            <Column
              title='center x'
              dataIndex='center_x'
              width='15%'
              align='center'
            />
            <Column
              title='center y'
              dataIndex='center_y'
              width='15%'
              align='center'
            />
            <Column
              title='width'
              dataIndex='width'
              width='15%'
              align='center'
            />
            <Column
              title='height'
              dataIndex='height'
              width='15%'
              align='center'
            />
            <Column
              title='type'
              dataIndex='type'
              width='15%'
              align='center'
            />
            <Column
              title='confidence level'
              dataIndex='confidence_level'
              width='15%'
              align='center'
            />
          </Table>
          </div>
          <div style={{ display: "flex" }}>
          <Button
            icon ={<DownloadOutlined />}
            style={{ marginLeft: "auto" }}
            onClick={downloadCsv}
          />
          </div>
        </Modal>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <DatePicker 
        style={{ margin: 2 }}
        onChange={(date, dateString) => {
          // console.log(dateString);
          setSelectedDate(dateString)
        }}/>
      <Table
        expandable={{
          onExpand,
          expandedRowRender,
        }}
        dataSource={ getEventDataId(eventList, whichDeviceName) }
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
          render={(data) =>{
            if(selectedDataId(DetailsFilter(data.Details))){
              return(
                <span
                  style={{
                  marginLeft: 8,
                  }}
                >
                  {`${selectedRowKeys.length}`}
                </span>
              )
            }else{
              return(
                <span
                  style={{
                  marginLeft: 8,
                  }}
                >
                  {'0'}
                </span>
              )}
          }}
          width='15%'
          align='center'
        />
        <Column
            title='操作'
            render={(data) => {
              if(selectedDataCleaned(DetailsFilter(data.Details))){
                setEventID(data.id)
                return(
                  <Button type="primary" onClick={start} disabled={false} loading={loading}>
                    save
                  </Button>
                )
              }
              else{
                return(
                  <Button type="primary" disabled={true} loading={loading}>
                    save
                  </Button>
                )}
            }}
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
    whichDeviceName: state.whichDeviceName,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getEventList(){
      const action = GetEventList()
      dispatch(action)
    },
    patchDetailsTableData(id,data){
      const action = PatchDetailsTableData(id,data)
      dispatch(action)
    },
    downloadImage(imageName) {
      const action = DownloadImage(imageName)
      dispatch(action)
    },
    downloadVideo(videoName) {
      const action = DownloadVideo(videoName)
      dispatch(action)
    },
    downloadCsvFile(csvName) {
      const action = DownloadCsvFile(csvName)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reportTable)