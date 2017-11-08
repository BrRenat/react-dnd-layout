import uuid from 'uuid/v4'

export const compact = (areas, area, rowId) => {
  const areaId = uuid()
  const newArea = { [areaId]: { id: areaId, area, rowId } }

  if (areas.length === 0) return { ...newArea }

  const newKeys = area.split('_')
  const newAreas = Object.values(areas).reduce((acc, areasItem) => {
    if (areasItem.rowId !== rowId) return ({ ...acc, [areasItem.id]: areasItem })

    let areasItemKeys = areasItem.area.split('_')

    newKeys.forEach(key => {
      areasItemKeys = areasItemKeys.filter(items => items !== key)
    })

    return ({
      ...acc,
      [areasItem.id]: {
        ...areasItem,
        area: areasItemKeys.join('_'),
      },
    })
  }, {})

  return { ...newAreas, ...newArea }
}

export const replaceAreas = (areas, area1, area2) => {
  return ({
    ...areas,
    [area1.id]: {
      id: area1.id,
      area: area2.area,
      rowId: area2.rowId,
    },
    [area2.id]: {
      id: area2.id,
      area: area1.area,
      rowId: area1.rowId,
    },
  })
}

export const replaceRows = (rows, row1, row2) => {
  return ({
    ...rows,
    [row1.id]: {
      id: row1.id,
      index: row2.index,
    },
    [row2.id]: {
      id: row2.id,
      index: row1.index,
    },
  })
}

export const compactRow = (rows, newRow, index) => {
  const newRows = Object.values(rows).reduce((acc, row) => {
    return ({
      ...acc,
      [row.id]: {
        id: row.id,
        index: row.index >= index ? row.index + 1 : row.index,
      },
    })
  }, {})

  return ({
    ...newRows,
    ...newRow,
  })
}
