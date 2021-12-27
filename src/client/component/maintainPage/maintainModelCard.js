import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { CHANGE_MAINTAIN_MODEL_CARD_KEY } from '../../store/actionType'

const MaintainModelCard = (props) => {
  const {
    maintainModelCardName,
    maintainModelCardKey,
    changeMaintainModelCardKey
  } = props

  return (
    <Card
      tabList={maintainModelCardName}
      activeTabKey={maintainModelCardKey}
      onTabChange={changeMaintainModelCardKey}
      tabBarExtraContent={
        <Fragment>
          <Button
            icon={<EditOutlined style={{ color: 'black' }} />}
            size='large'
          />
          <Button
            icon={<DeleteOutlined style={{ color: 'black' }} />}
            size='large'
          />
        </Fragment>
      }
    >
    </Card>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    maintainModelCardName: state.maintainModelCardName,
    maintainModelCardKey: state.maintainModelCardKey
    //props裡的參數與store的數據對應關係
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    changeMaintainModelCardKey(key) {
      const action = {
        type: CHANGE_MAINTAIN_MODEL_CARD_KEY,
        value: key
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintainModelCard)