import React from 'react'
import { Typography } from 'antd'

const { Text, Link } = Typography

const Resource = () => {
  return (
    <Text>
      地圖圖示:Icons made by { }
      <Link href='https://www.flaticon.com/authors/aquariid' target='_blank'>
        AquariiD
      </Link>
      { } from { }
      <Link href='https://www.flaticon.com/' target='_blank'>
        www.flaticon.com
      </Link>
    </Text>
  )
}

export default Resource