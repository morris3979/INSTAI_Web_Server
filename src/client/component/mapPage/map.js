import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const greenIcon = L.icon({
  iconUrl: require('../../icon image/green car.png'),
  iconSize: [48, 48]
})

const redIcon = L.icon({
  iconUrl: require('../../icon image/red car.png'),
  iconSize: [48, 48]
})

/*const location = [
  { 'position': [25.0427, 121.5357], 'icon': '1' },
  { 'position': [25.0431, 121.5357], 'icon': '1' }
]*/
const location = []
for (let n = 250427; n < 250900; n += 4) {
  location.push({
    'position': [n / 10000, 121.5357],
    'icon': '1'
  })
}
location.forEach((item, index, lrr) => {
  if (item.icon == '1') {
    lrr[index].icon = greenIcon
  } else {
    lrr[index].icon = redIcon
  }
})

const markerGroup = location.map((item) => {
  return (
    <Marker position={item.position} icon={item.icon} />
  )
})

const Map = () => {
  return (
    <MapContainer
      center={[25.0426, 121.537]}
      zoom={17}
      style={{ height: '100vh' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
      />
      {markerGroup}
    </MapContainer>
  )
}

export default Map