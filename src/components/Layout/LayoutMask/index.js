import React from 'react'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'

import ItemTypes from '../ItemTypes'

import {
  LayoutMaskBox,
} from './styles'

const boxTarget = {
  drop (props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop()

    component.setState({
      hasDropped: true,
      hasDroppedOnChild,
    })

    const { i } = props
    component.props.addArea(i)
  },
}

class LayoutMask extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false,
    }
  }

  render () {
    const props = this.props
    const connectDropTarget = props.connectDropTarget
    const { hasDropped } = this.state

    return connectDropTarget(
      <div>
        <LayoutMaskBox {...props} hasDropped={hasDropped} />
      </div>
    )
  }
}

export default compose(
  DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  })),
)(LayoutMask)
