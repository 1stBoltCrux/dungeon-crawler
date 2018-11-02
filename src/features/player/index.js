import React from 'react'
import { connect } from 'react-redux'
import skele from '../../assets/images/skele.png'
import handleMovement from './movement'

function Player(props) {
  return (
    <div style={{
      position: 'absolute',
      top: props.position[1],
      left: props.position[0],
      backgroundImage: `url('${skele}')`,
      backgroundPosition: '0  384px',
      width: '60px',
      height: '60px'
    }}>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(handleMovement(Player))
