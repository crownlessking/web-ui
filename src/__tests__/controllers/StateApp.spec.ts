import State from '../../controllers/State'
import StateApp from '../../controllers/StateApp'
import store from '../../state'

test('StateApp.csrfTokenName()', done => {
  const stateJson = store.getState()
  stateJson.app.csrfTokenName = 'source'
  const root = new State(stateJson)
  const app = new StateApp(stateJson.app, root)
  expect(app.csrfTokenName).toBe('source')
  done()
})

test('StateApp.csrfTokenMethod()', done => {
  const stateJson1 = store.getState()
  const root1 = new State(stateJson1)
  const app1 = new StateApp(stateJson1.app, root1)
  expect(app1.csrfTokenMethod).toBe('meta')

  const stateJson2 = store.getState()
  stateJson2.app.csrfTokenMethod = 'javascript'
  const root2 = new State(stateJson2)
  const app2 = new StateApp(stateJson2.app, root2)
  expect(app2.csrfTokenMethod).toBe('javascript')
  done()
})

test('StateApp.csrfToken', done => {
  const metaName = 'source'
  const token    = 'mind yours'

  const meta = document.createElement('meta')
  meta.id = 'stateapp-getcsrftoken'
  meta.name = metaName
  meta.content = token
  document.head.appendChild(meta)

  const stateJson1 = store.getState()
  stateJson1.app.csrfTokenName = metaName
  const root1 = new State(stateJson1)
  const app1 = new StateApp(stateJson1.app, root1)
  expect(app1.csrfToken).toBe(token)
  document.head.removeChild(meta);

  (window as {[x: string]: any}).csrfTest = token
  const stateJson2 = store.getState()
  stateJson2.app.csrfTokenName = metaName
  stateJson2.app.csrfTokenMethod = 'javascript'
  const root2 = new State(stateJson2)
  const app2 = new StateApp(stateJson2.app, root2)
  expect(app2.csrfToken).toBe(token)

  done()
})