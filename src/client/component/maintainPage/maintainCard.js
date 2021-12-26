import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Table, Popconfirm } from 'antd'

const { Column } = Table

const MaintainCard = (props) => {
  const { maintainCardName } = props

  return (
    <Fragment>
      {maintainCardName.map((cardName) => {
        return (
          <Card
            title={cardName}
            extra={
              <Button>
                編輯
              </Button>
            }
          >
          </Card>
        )
      })}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    maintainCardName: state.maintainCardName
    //props裡的參數與store的數據對應關係
  }
}

export default connect(mapStateToProps, null)(MaintainCard)