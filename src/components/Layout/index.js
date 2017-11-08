import React from 'react'
import { DragDropContext } from 'react-dnd'
import { compose } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import uuid from 'uuid/v4'

import DraggableBox from 'components/DraggableBox'
import LayoutAreasContainer from './LayoutAreasContainer'
import AreaMask from './AreaMask'

import { compact, replaceAreas, replaceRows, compactRow } from './utils'

import {
  LayoutContainer,
  LayoutSidebar,
  LayoutBody,
} from './styles'

class Layout extends React.Component {
  state = {
    layouts: {},
    areas: {},
  }

  addRow = (index) => {
    const newRowId = uuid()
    const newAreaId = uuid()

    const newArea = {
      [newAreaId]: {
        id: newAreaId,
        rowId: newRowId,
        area: 'i1_i2_i3_i4',
      },
    }
    const newRow = {
      [newRowId]: {
        id: newRowId,
        index,
      },
    }

    this.setState(state => ({
      layouts: compactRow(state.layouts, newRow, index),
      areas: { ...state.areas, ...newArea },
    }))
  }

  addArea = (area, rowId) => {
    this.setState(state => ({
      areas: compact(state.areas, area, rowId),
    }))
  }

  replaceAreas = (area1, area2) => {
    this.setState(state => ({
      areas: replaceAreas(state.areas, area1, area2),
    }))
  }

  replaceRows = (row1, row2) => {
    this.setState(state => ({
      layouts: replaceRows(state.layouts, row1, row2),
    }))
  }

  renderAreaRow = (row, index) => {
    const areas = Object.values(this.state.areas)

    return [
      <LayoutAreasContainer
        key={`${row.id}-0`}
        areas={areas.filter(area => area.rowId === row.id)}
        id={row.id}
        index={row.index}
        replaceAreas={this.replaceAreas}
        addArea={this.addArea}
        replaceRows={this.replaceRows}
      />,
      <AreaMask key={`${row.id}-1`} addRow={this.addRow} index={index + 2} />,
    ]
  }

  render () {
    const layouts = Object.values(this.state.layouts)

    return (
      <LayoutContainer>
        <LayoutSidebar>
          <DraggableBox />
        </LayoutSidebar>
        <LayoutBody>
          <AreaMask addRow={this.addRow} index={1} />
          {layouts.sort((a, b) => a.index > b.index).map(this.renderAreaRow)}
        </LayoutBody>
      </LayoutContainer>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
)(Layout)
