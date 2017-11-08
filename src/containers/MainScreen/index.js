import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { testAction } from 'redux/test/actions'
import { testActionResultSelector } from 'redux/test/selectors'

import Layout from 'components/Layout'

import { MainContainer } from './styles'

const mapDispatchToProps = {
  testAction,
}

const mapStateToProps = createStructuredSelector({
  testActionResult: testActionResultSelector,
})

class MainScreen extends Component {

  render () {
    return (
      <MainContainer>
        <div style={{ width: '100%', height: '500px' }}>
          <Layout />
        </div>
      </MainContainer>
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MainScreen)
