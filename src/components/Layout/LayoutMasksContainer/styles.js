import styled from 'styled-components'

export const MasksContainer = styled.div`
  width: 100%;
  height: 100%;
  
  position: absolute;
  
  z-index: ${props => props.isTop ? 4 : 2};
`

export const MaskGrid = styled.div`
  position: absolute;
  border: 1px dashed grey;
  
  width: ${props => props.w === 1 ? '50%' : '100%'};
  height: ${props => props.h === 1 ? '50%' : '100%'};
  
  box-sizing: border-box;
  
  top: ${props => props.y === 0 ? '0%' : '50%'};
  left: ${props => props.x === 0 ? '0%' : '50%'};
`
