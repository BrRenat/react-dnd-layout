import React from 'react'
import { compose } from 'redux'
import { DragSource, DropTarget } from 'react-dnd'
import styled from 'styled-components'

import ItemTypes from 'components/Layout/ItemTypes'

const areaSource = {
  beginDrag (props) {
    return ({ props })
  },
}

const areaTarget = {
  drop (props, monitor, component) {
    const hoveredArea = props
    const draggableArea = monitor.getItem().props

    const offset = monitor.getDifferenceFromInitialOffset()

    if (hoveredArea && draggableArea) {
      const area1 = {
        id: hoveredArea.id,
        area: hoveredArea.area,
        rowId: hoveredArea.rowId,
      }
      const area2 = {
        id: draggableArea.id,
        area: draggableArea.area,
        rowId: draggableArea.rowId,
      }
      props.replaceAreas(area1, area2)
    }
  }
}

class LayoutItem extends React.Component {
  render () {
    const { children, connectDragSource, isDragging, connectDropTarget, className } = this.props

    if (isDragging) return null

    return connectDragSource(connectDropTarget(
      <div className={className}>
        {children}
      </div>
    ))
  }
}

const LayoutItemContainer = styled(LayoutItem)`
  position: absolute;
  
  width: ${props => props.w === 1 ? '50%' : '100%'};
  height: ${props => props.h === 1 ? '50%' : '100%'};
  
  box-sizing: border-box;
  
  top: ${props => props.y === 0 ? '0%' : '50%'};
  left: ${props => props.x === 0 ? '0%' : '50%'};
  
  z-index: 3;
  
  background: #2b805c;
  border: 1px solid black;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  transition: all .1s ease-in;
`

export default compose(
  DropTarget(ItemTypes.AREA, areaTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ItemTypes.AREA, areaSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(LayoutItemContainer)
