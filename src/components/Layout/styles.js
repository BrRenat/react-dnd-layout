import styled from 'styled-components'

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-wrap: nowrap;
`

export const LayoutSidebar = styled.div`
  background: #1f2b3d;
  
  height: 100%;
  width: 150px;
  
  display: flex;
  flex-direction: column;
  
  flex-shrink: 0;
`
export const LayoutBody = styled.div`
  position: relative;
  
  width: 100%;
  height: 100%;
`
