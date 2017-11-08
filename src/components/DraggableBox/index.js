import React from 'react'
import { DragSource } from 'react-dnd'

import ItemTypes from 'components/Layout/ItemTypes'

export const Box = {
  background: 'rgb(8,37,54)',

  margin: '5px',
  padding: '15px 20px',

  display: 'inline-block',
  color: '#fff',
}

const boxSource = {
  beginDrag () {
    return {}
  },
}

class DraggableBox extends React.Component {
  render () {
    const { connectDragSource } = this.props

    return connectDragSource(
      <div style={Box}>
        Drag me
      </div>
    )
  }
}

export default DragSource(ItemTypes.BOX, boxSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DraggableBox)
