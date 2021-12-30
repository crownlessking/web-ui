
import React from 'react'
import renderer from 'react-test-renderer'
import Content from '../../components/content.component'
import initialState from '../../state/initial.state'
import _ from 'lodash'
import { RootState } from '../../state'
import { IStateAllPages } from '../../interfaces'
import State from '../../controllers/State'

// const pages: IStateAllPages = {
//   '/login': {
//     'content': ''
//   }
// }

// const state = _.extend<RootState>(initialState, {
//   pages
// })

test('Content is now a form', done => {

  // const stateDef = new State(state)
  // const loginPageDef = stateDef.allPages.pageAt('/login')

  // const component = renderer.create(
  //   <Content def={loginPageDef} />
  // )

  done()
})
