import React from 'react'
import { connect } from 'react-redux'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const MainMap = () => {
  return (
    <MapContainer
      center={[25.0426, 121.537]}
      zoom={17}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  )
}

export default connect(null, null)(MainMap)