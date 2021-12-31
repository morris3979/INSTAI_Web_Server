import React, { Component } from 'react'
import { connect } from 'react-redux'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class MainMap extends Component {
  componentDidMount() {
    const mymap = L.map("mapid").setView([25.03418, 121.564517], 17)
    const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    L.tileLayer(OSMUrl).addTo(mymap)
  }

  render() {
    return (
      <div id="mapid" style={{ height: "100vh", width: "100vw" }} />
    )
  }
}

export default connect(null, null)(MainMap)