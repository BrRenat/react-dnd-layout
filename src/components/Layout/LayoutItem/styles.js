import styled from 'styled-components'

export const LayoutItemContainer = styled.div`
  position: absolute;
  
  width: ${props => props.w === 1 ? '50%' : '100%'};
  height: ${props => props.h === 1 ? '50%' : '100%'};
  
  box-sizing: border-box;
  
  top: ${props => props.y === 0 ? '0%' : '50%'};
  left: ${props => props.x === 0 ? '0%' : '50%'};
  
  background: #2b805c;
  border: 1px solid black;
  
  display: flex;
  align-items: center;
  justify-content: center;
`
