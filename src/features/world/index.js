import React from 'react'
import Map from '../map'
import Player from '../player'

function World(props) {
  return(
    <div
    style={{
      position: 'relative',
      width: '1200px',
      height: '600px',
      margin: '20px auto'
    }}
    >
    <Map/>
    <Player/>
    </div>
  )
}

export default World
