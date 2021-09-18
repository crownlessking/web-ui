
import React from 'react'
import renderer from 'react-test-renderer'
import Content from '../content.component'
import initialState from '../../state/initial.state'
import _ from 'lodash'
import { IState, IStateAllPages } from '../../interfaces'
import State from '../../state/controller'

const pages: IStateAllPages = {
  '/login': {
    'content': ''
  }
}

const state = _.extend<IState>(initialState, {
  pages
})

test('Content is now a form', () => {

  const stateDef = new State(state)
  const loginPageDef = stateDef.allPages.pageAt('/login')

  const component = renderer.create(
    <Content def={loginPageDef} />
  )

})
