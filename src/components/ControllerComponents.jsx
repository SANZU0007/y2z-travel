import React from 'react'
import Header from './Header'
import Mapview from './Mapview'
import Card from './Card'

const ControllerComponents = () => {
  return (
    <div className="flex justify-between">
      {/* Left side: Header and Card stacked vertically */}
      <div>
        <Header />
        <Card />
      </div>

      {/* Right side: Mapview will be hidden below 360px */}
      <div
        className="mapview-wrapper"
        style={{
          display: window.innerWidth < 360 ? 'none' : 'block',
        }}
      >
        <Mapview />
      </div>
    </div>
  )
}

export default ControllerComponents
