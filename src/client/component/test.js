import React, { Fragment, useState } from 'react'
import { Table, Button, Typography, Collapse } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player/lazy'

const { Column } = Table
const { Text } = Typography
const { Panel } = Collapse

const data = [
  {
    key: 1,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192323_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192323_camera1_front_body'
  },
  {
    key: 2,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192058_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192058_camera1_front_body'
  },
  {
    key: 3,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220808202505_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220808202505_camera1_front_body'
  },
  {
    key: 4,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192323_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192323_camera1_front_body'
  },
  {
    key: 5,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220728192058_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220728192058_camera1_front_body'
  },
  {
    key: 6,
    videoURL: 'https://d20cmf4o2f77jz.cloudfront.net/video/00000000674a3751_1_20220808202505_camera1_front_body.mp4',
    description: '00000000674a3751_1_20220808202505_camera1_front_body'
  }
]

const video = (text) => {
  return (
    <Fragment align='center'>
      <ReactPlayer
        url={`${text.videoURL}`}
        controls={true}
        position='relative'
        width='100%'
        height='100%'
      />
    </Fragment>
  )
}

const description = (text) => {
  return (
    <Fragment align='center'>
      <Text>{text.description}</Text>
    </Fragment>
  )
}

const download = () => {
  return (
    <Fragment>
      <Button icon={<DownloadOutlined />} />
    </Fragment>
  )
}

const Test = () => {
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

  return (
    <Fragment>
      <Collapse>
        <Panel header='0000000039aed1d2 (RasPi_01)'>
          <Collapse>
            <Panel header='0x7680 (PAG_01)'>
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                  send
                </Button>
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </div>
              <Table
                dataSource={data}
                rowSelection={rowSelection}
                pagination={{ position: ['bottomCenter'], pageSize: 2 }}
              >
                <Column
                  title='採集資料'
                  render={video}
                  ellipsis={true}
                  width='30%'
                  align='center'
                />
                <Column
                  title='資料名稱'
                  render={description}
                  ellipsis={true}
                  align='center'
                />
                <Column
                  title='操作'
                  render={download}
                  width='15%'
                  align='center'
                />
              </Table>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header='0000000012aed3d4 (RasPi_02)'>
          <Collapse>
            <Panel header='0x7680 (PAG_02)'>
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                  send
                </Button>
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </div>
              <Table
                dataSource={data}
                rowSelection={rowSelection}
                pagination={{ position: ['bottomCenter'], pageSize: 2 }}
              >
                <Column
                  title='採集資料'
                  render={video}
                  ellipsis={true}
                  width='30%'
                  align='center'
                />
                <Column
                  title='資料名稱'
                  render={description}
                  ellipsis={true}
                  align='center'
                />
                <Column
                  title='操作'
                  render={download}
                  width='15%'
                  align='center'
                />
              </Table>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </Fragment>
  )
}

export default Test