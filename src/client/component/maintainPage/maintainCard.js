import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Table, Popconfirm } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { CHANGE_MAINTAIN_CARD_KEY } from '../../store/actionType'

const { Column } = Table

const contentlist = {
  test: <p>test</p>,
  test2: <p>test2</p>
}

const MaintainCard = (props) => {
  const {
    maintainCardName,
    maintainCardKey,
    changeMaintainCardKey
  } = props

  return (
    <Fragment>
      <Card
        tabList={maintainCardName}
        activeTabKey={maintainCardKey}
        onTabChange={changeMaintainCardKey}
        tabBarExtraContent={
          <Button
            icon={<EditOutlined style={{ color: 'black' }} />}
            size='large'
          />
        }
      >
        {contentlist[maintainCardKey]}
      </Card>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    maintainCardName: state.maintainCardName,
    maintainCardKey: state.maintainCardKey
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    changeMaintainCardKey(key) {
      const action = {
        type: CHANGE_MAINTAIN_CARD_KEY,
        value: key
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintainCard)