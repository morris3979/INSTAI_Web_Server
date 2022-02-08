import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { message } from 'antd'
import L from 'leaflet'
import {
  MapPosition
} from '../../store/actionCreater'
import 'leaflet/dist/leaflet.css'

message.config({ maxCount: 1 })

const greenIcon = L.icon({
  iconUrl: require('../../icon image/green car.png'),
  iconSize: [48, 48]
})
const redIcon = L.icon({
  iconUrl: require('../../icon image/red car.png'),
  iconSize: [48, 48]
})

const location = []

const positionData = (data) => {
  data.map((dataItem) => {
    const position = dataItem.position.split(',')
    position.forEach((item) => {
      position.push(Number(item))
    })
    position.splice(0, 2)

    if (dataItem.stayTime < 10) {
      location.push({
        'position': position,
        'icon': greenIcon
      })
    } else {
      location.push({
        'position': position,
        'icon': redIcon
      })
    }
  })

  const map = L.map('map').setView([25.0426, 121.535], 17)
  const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  L.tileLayer(OSMUrl).addTo(map)
  location.map((item) => {
    L.marker(item.position, { icon: item.icon }).addTo(map)
  })
}

class Map extends Component {
  async componentDidMount() {
    message.loading('載入中', 0)
    try {
      const response = await axios.get('http://localhost:8080/api/detail')
      this.props.mapPosition(response.data)
      positionData(this.props.mapPositionData)
      message.success('完成')
    } catch (error) {
      message.error(`${error}`)
    }
  }

  render() {
    return (
      <div id='map' style={{ height: '100vh' }} />
    )
  }
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    mapPositionData: state.mapPositionData
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    mapPosition(data) {
      const action = MapPosition(data)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)