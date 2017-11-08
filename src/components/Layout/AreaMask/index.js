import React from 'react'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'

import ItemTypes from '../ItemTypes'

import {
  AreaBox,
} from './styles'

const boxTarget = {
  drop (props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop()

    component.setState({
      hasDropped: true,
      hasDroppedOnChild,
    })

    component.props.addRow(props.index)
  },
}

class Area extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false,
    }
  }

  render () {
    const { connectDropTarget, isOverCurrent } = this.props
    const { hasDropped } = this.state

    return connectDropTarget(
      <div>
        <AreaBox isOver={isOverCurrent} hasDropped={hasDropped} />
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
)(Area)
