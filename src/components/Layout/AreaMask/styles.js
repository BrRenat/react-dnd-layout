import styled from 'styled-components'

export const AreaBox = styled.div`
  width: 100%;
  height: 50px;
  
  box-sizing: border-box;
  
  border: 1px dashed;
  border-color: grey;
  background: ${props => props.isOver ? 'rgba(255,0,0,0.32)' : 'transparent'};
`
