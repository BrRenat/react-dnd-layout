import React from 'react'

import Layout from 'components/Layout'

import { MainContainer } from './styles'

const MainScreen = () => {
  return (
    <MainContainer>
      <div style={{ width: '100%', height: '500px' }}>
       <Layout />
      </div>
    </MainContainer>
  )
}

export default MainScreen
