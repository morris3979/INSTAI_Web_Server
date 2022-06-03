import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { message, Modal } from 'antd'
import L from 'leaflet'
//import 'leaflet.locatecontrol'
//import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { MapPosition } from '../../store/actionCreater'
import 'leaflet/dist/leaflet.css'
//import 'leaflet.locatecontrol/dist/L.control.Locate.css'
//import 'leaflet-geosearch/dist/geosearch.css'
import greenCar from '../../icon image/green car.png'
import redCar from '../../icon image/red car.png'

const greenIcon = L.icon({
  iconUrl: greenCar,
  iconSize: [48, 48]
})
const redIcon = L.icon({
  iconUrl: redCar,
  iconSize: [48, 48]
})

const location = []
const positionData = (data) => {
  data.map((dataItem) => {
    if (dataItem.position) {
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
    }
  })
}

/*const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
  showMarker: false
})*/

const showMap = () => {
  const map = L.map('map').setView([25.0426, 121.535], 17)
  const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  L.tileLayer(OSMUrl).addTo(map)
  //L.control.locate().addTo(map)
  //map.addControl(searchControl)
  /*if (location.length > 0) {
    location.map((item) => {
      L.marker(item.position, { icon: item.icon }).addTo(map)
    })
  }*/
}

class Map extends Component {
  async componentDidMount() {
    //message.loading('載入中...', 0)
    try {
      /*const response = await axios.get('/api/event')
      console.log(response.data)
      this.props.mapPosition(response.data)
      positionData(this.props.mapPositionData)*/
      message.destroy()
    } catch (error) {
      message.destroy()
      Modal.error({
        title: `${error}`,
        onOk: () => { location.reload() }
      })
    } finally {
      showMap()
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