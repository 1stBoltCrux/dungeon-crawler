import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

export default function handleMovement(player) {

  function getNewPosition(oldPosition, direction) {
    switch(direction) {
      case 'WEST':
        return [ oldPosition[0] - SPRITE_SIZE, oldPosition[1]]
      case 'NORTH':
        return [ oldPosition[0], oldPosition[1] - SPRITE_SIZE]
      case 'EAST':
        return [ oldPosition[0] + SPRITE_SIZE, oldPosition[1]]
      case 'SOUTH':
        return [ oldPosition[0], oldPosition[1] + SPRITE_SIZE]
    }
  }

function getWalkIndex(){
    const walkIndex = store.getState().player.walkIndex
    console.log(walkIndex);
    return walkIndex >= 8 ? 0 : walkIndex + 1
  }

  function observeBoundaries(oldPosition, newPosition) {
    return (newPosition[0] >= 0 && newPosition[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPosition[1] >= 0 && newPosition[1] <= MAP_HEIGHT - SPRITE_SIZE)

  }

  function observeImpassable(oldPosition, newPosition){
    const tiles = store.getState().map.tiles
    const y = newPosition[1] / SPRITE_SIZE
    const x = newPosition[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    return nextTile < 5
  }

  function dispatchMove(direction, newPosition) {
    const walkIndex = getWalkIndex()
    const oldPosition = store.getState().player.position
    console.log(oldPosition);


    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPosition,
        direction: direction,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        walkIndex: walkIndex
      }
    })
  }

  function attemptMove(direction) {
    const oldPosition = store.getState().player.position
    const newPosition = getNewPosition(oldPosition, direction)
    console.log(newPosition);

    if(observeBoundaries(oldPosition, newPosition) && observeImpassable(oldPosition, newPosition))
    dispatchMove(direction, newPosition)
  }

  function getSpriteLocation(direction, walkIndex){
    switch(direction) {
      case 'WEST':
        return `${(SPRITE_SIZE + 5) * walkIndex}px ${SPRITE_SIZE * 3 + 10}px`
      case 'EAST':
        return `${(SPRITE_SIZE + 5) * walkIndex}px ${SPRITE_SIZE * 1}px`
      case 'NORTH':
        return `${(SPRITE_SIZE + 5) * walkIndex}px ${SPRITE_SIZE * 0}px`
      case 'SOUTH':
        return `${(SPRITE_SIZE + 5) * walkIndex}px ${SPRITE_SIZE * 2}px`
    }
  }

  function handleKeyDown(e) {
    e.preventDefault()

    switch(e.keyCode) {
      case 37:
        return attemptMove('WEST')
      case 38:
        return attemptMove('NORTH')
      case 39:
        return attemptMove('EAST')
      case 40:
        return attemptMove('SOUTH')
      default:
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })


  return player
}
