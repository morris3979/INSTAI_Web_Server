import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Typography } from 'antd'
import { DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'

const { Column } = Table
const { Text } = Typography

const video = (text) => {
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

const download = () => {
  return (
    <Fragment>
      <Button icon={<DownloadOutlined />} />
    </Fragment>
  )
}

const reportTable = (props) => {
  const {} = props

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

  const expandedRowRender = (props) => {
    const detailsData = [
      {
        key: 1,
        details: 'projectA_0000000039aed1d2_0x7680_20221013181402_001',
        rawData: true,
        cleaned: false
      },
      {
        key: 2,
        details: 'projectA_0000000039aed1d2_0x7680_20221013181129_001',
        rawData: true,
        cleaned: false
      },
      {
        key: 3,
        details: 'projectA_0000000039aed1d2_0x7680_20221013180307_001',
        rawData: true,
        cleaned: false
      },
      {
        key: 4,
        details: 'projectA_0000000039aed1d2_0x7680_20221013181402_001',
        rawData: true,
        cleaned: false
      },
      {
        key: 5,
        details: 'projectA_0000000039aed1d2_0x7680_20221013181129_001',
        rawData: true,
        cleaned: false
      },
      {
        key: 6,
        details: 'projectA_0000000039aed1d2_0x7680_20221013180307_001',
        rawData: true,
        cleaned: false
      }
    ]

    return (
      <Fragment>
        <Table
        dataSource={detailsData}
        rowSelection={rowSelection}
        pagination={{ position: ['bottomCenter'], pageSize: 2 }}
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

  const eventData = [
    {
      key: '0',
      eventTime: '2022-10-12 15:26:12',
      trigger: '0',
    },
    {
      key: '1',
      eventTime: '2022-10-12 15:34:32',
      trigger: '0',
    },
  ];

  return (
    <Fragment>
      <Table
        expandable={{
          expandedRowRender,
        }}
        dataSource={eventData}
      >
        <Column
            title='事件時間'
            dataIndex='eventTime'
            ellipsis={true}
            align='center'
        />
        <Column
            title='觸發 (0:主動, 1:被動)'
            dataIndex='trigger'
            ellipsis={true}
            align='center'
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(reportTable)