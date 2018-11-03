import React from 'react'
import {SPRITE_SIZE} from '../../config/constants'
import './styles.css'
import { connect } from 'react-redux'
import grass from './tiles/grass.jpeg'

function getTileSprite(type){
  switch(type) {
    case 0:
      return 'grass'
    case 4:
      return 'stone-floor'
    case 5:
      return 'rock'
    case 6:
      return 'tree'

  }
}

function MapTile(props){
  return <div
    style={{
      height: SPRITE_SIZE ,
      width:  SPRITE_SIZE
    }}
   className={`tile ${getTileSprite(props.tile)}`}>

   </div>
}

function MapRow(props){
  return <div className="row">
  {
    props.tiles.map( tile => <MapTile tile={tile}/>)
  }
  </div>
}

function Map(props) {
  return(
    <div
      style={{
        width: SPRITE_SIZE * 20,
        height: SPRITE_SIZE * 10,
        backgroundImage: `url(${grass})`,
        border: '4px, solid, black',
      }}>
      {
        props.tiles.map(row =>  <MapRow tiles={row}/>)
      }
      </div>
  )
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles
  }
}

export default connect(mapStateToProps)(Map)
