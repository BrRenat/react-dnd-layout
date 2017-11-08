import React from 'react'
import { compose } from 'redux'
import { DragSource, DropTarget } from 'react-dnd'
import styled from 'styled-components'

import ItemTypes from 'components/Layout/ItemTypes'
import LayoutMasksContainer from '../LayoutMasksContainer'

import LayoutItem from '../LayoutItem'

const AreasContainer = {
  width: '100%',
  height: '100%',
  position: 'relative',
  zIndex: 3,
}

const DragPoint = styled.div`
  position: absolute;
  
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  
  z-index: 4;
  
  background: red;
`

const areaSource = {
  beginDrag (props) {
    return ({ props })
  },
}

const areaTarget = {
  drop (props, monitor, component) {
    if (monitor.getItemType() === ItemTypes.ROW) {
      const hoveredArea = props
      const draggableArea = monitor.getItem().props

      if (hoveredArea && draggableArea) {
        const row1 = {
          id: hoveredArea.id,
          index: hoveredArea.index,
        }
        const row2 = {
          id: draggableArea.id,
          index: draggableArea.index,
        }
        props.replaceRows(row1, row2)
      }
    }
  }
}

class LayoutAreasContainer extends React.Component {
  getAreaItem = ({ area, id, rowId }) => {
    let props = {}
    switch (area) {
      case 'i1_i2_i3_i4':
        props = { rowId, id, key: id, x: 0, y: 0, w: 2, h: 2, area }
        break
      case 'i1_i2':
        props = { rowId, id, key: id, x: 0, y: 0, w: 2, h: 1, area }
        break
      case 'i3_i4':
        props = { rowId, id, key: id, x: 0, y: 1, w: 2, h: 1, area }
        break
      case 'i1_i3':
        props = { rowId, id, key: id, x: 0, y: 0, w: 1, h: 2, area }
        break
      case 'i2_i4':
        props = { rowId, id, key: id, x: 1, y: 0, w: 1, h: 2, area }
        break
      case 'i1':
        props = { rowId, id, key: id, x: 0, y: 0, w: 1, h: 1, area }
        break
      case 'i2':
        props = { rowId, id, key: id, x: 1, y: 0, w: 1, h: 1, area }
        break
      case 'i3':
        props = { rowId, id, key: id, x: 0, y: 1, w: 1, h: 1, area }
        break
      case 'i4':
        props = { rowId, id, key: id, x: 1, y: 1, w: 1, h: 1, area }
        break
      default:
        break
    }
    return (
      <LayoutItem
        {...props}
        replaceAreas={this.props.replaceAreas}
        key={`${rowId}-${id}`}
      >
        {id}
      </LayoutItem>
    )
  }

  addArea = (area) => {
    this.props.addArea(area, this.props.id)
  }

  render () {
    const { areas, connectDragSource, connectDropTarget, isDragging, addArea, id, isOver } = this.props

    if (isDragging) return connectDragSource(connectDropTarget(
      <div style={AreasContainer}>
        <LayoutMasksContainer areas={[]} addArea={this.addArea} />
      </div>
    ))

    return connectDragSource(connectDropTarget(
      <div
        style={{
          ...AreasContainer,
          opacity: isOver ? 0.8 : 1,
        }}
      >
        <DragPoint />
        <LayoutMasksContainer areas={areas} addArea={this.addArea} />
        {areas.map(this.getAreaItem)}
      </div>
    ))
  }
}

export default compose(
  DropTarget(ItemTypes.ROW, areaTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
  DragSource(ItemTypes.ROW, areaSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(LayoutAreasContainer)
