import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'

const MaintainCard = (props) => {
  const { maintainCardName } = props

  return (
    <div>
      {
        console.log(maintainCardName),
        maintainCardName.map((item) => {
          return (
            <Card
              title={item}
              extra={
                <Button>
                  編輯
                </Button>
              }
            >
            </Card>
          )
        })
      }
    </div>
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