import React from 'react'
import { DragLayer } from 'react-dnd'
import { compose } from 'redux'

import Mask from '../LayoutMask'
import ItemTypes from '../ItemTypes'

import {
  MasksContainer,
  MaskGrid,
} from './styles'

import { masks } from '../constants'

const collect = (monitor) => {
  if (monitor.getClientOffset()) {
    return {
      draggablePosX: monitor.getClientOffset().x,
      draggablePosY: monitor.getClientOffset().y,
      draggingItem: monitor.getItemType(),
      isDragging: monitor.isDragging(),
    }
  }
  return {
    draggingItem: monitor.getItemType(),
    isDragging: monitor.isDragging(),
  }
}

class LayoutMasksContainer extends React.Component {
  state = {}

  componentDidMount () {
    const layoutNodeCoords = this.layoutNode.getBoundingClientRect()

    this.setState(() => ({
      layoutNodePosX: layoutNodeCoords.left,
      layoutNodePosY: layoutNodeCoords.top,
      layoutNodePosXEnd: layoutNodeCoords.right,
      layoutNodePosYEnd: layoutNodeCoords.bottom,
      layoutNodeWidth: layoutNodeCoords.width,
      layoutNodeHeight: layoutNodeCoords.height,
    }))
  }

  getLayoutRef = (node) => {
    this.layoutNode = node
  }

  getMasksSource = () => {
    const {
      layoutNodePosX,
      layoutNodePosY,
      layoutNodeWidth,
      layoutNodeHeight,
    } = this.state

    const {
      draggablePosX,
      draggablePosY,
      areas,
    } = this.props

    if (areas.length === 0) {
      return [{ x: 0, y: 0, w: 2, h: 2, i: 'i1_i2_i3_i4' }]
    }

    if (areas.length === 1) {
      if (
        draggablePosX >= (layoutNodeWidth / 3) + layoutNodePosX &&
        draggablePosX <= (layoutNodeWidth / 3 * 2) + layoutNodePosX
      ) {
        return [
          {
            x: 0,
            y: 0,
            w: 2,
            h: 1,
            i: 'i1_i2',
          },
          {
            x: 0,
            y: 1,
            w: 2,
            h: 1,
            i: 'i3_i4',
          },
        ]
      }

      return [
        {
          x: 0,
          y: 0,
          w: 1,
          h: 2,
          i: 'i1_i3',
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 2,
          i: 'i2_i4',
        },
      ]
    }

    if (areas.length === 4) return []

    return masks
  }

  render () {
    const { addArea, draggingItem, isDragging } = this.props
    const maskSource = this.getMasksSource()

    return (
      <MasksContainer
        innerRef={this.getLayoutRef}
        isTop={draggingItem === ItemTypes.BOX}
      >
        {isDragging && masks.map((mask, i) =>
          <MaskGrid key={i} {...mask} />)
        }
        {draggingItem === ItemTypes.BOX && maskSource.map((mask, i) =>
          <Mask key={i} {...mask} maskSource={maskSource} addArea={addArea} greedy />)
        }
      </MasksContainer>
    )
  }
}

export default compose(
  DragLayer(collect),
)(LayoutMasksContainer)
