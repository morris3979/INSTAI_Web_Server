import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const icon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png')
})

const MainMap = () => {
  return (
    <MapContainer
      center={[25.0426, 121.537]}
      zoom={17}
      style={{ height: '100vh' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[25.0427, 121.5357]}
        icon={icon}
      />
    </MapContainer>
  )
}

export default MainMap