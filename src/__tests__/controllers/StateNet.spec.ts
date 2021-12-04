import State from '../../controllers/State'
import StateNet from '../../controllers/StateNet'
import store from '../../state'

test('StateNet.csrfTokenName()', done => {
  // const stateJson = store.getState()
  // stateJson.net.csrfTokenName = 'source'
  // const root = new State(stateJson)
  // const net = new StateNet(stateJson.net, root)
  // expect(net.csrfTokenName).toBe('source')
  done()
})

test('StateNet.csrfTokenMethod()', done => {
  // const stateJson1 = store.getState()
  // const root1 = new State(stateJson1)
  // const net1 = new StateNet(stateJson1.net, root1)
  // expect(net1.csrfTokenMethod).toBe('meta')

  // const stateJson2 = store.getState()
  // stateJson2.net.csrfTokenMethod = 'javascript'
  // const root2 = new State(stateJson2)
  // const net2 = new StateNet(stateJson2.net, root2)
  // expect(net2.csrfTokenMethod).toBe('javascript')
  done()
})

test('StateNet.csrfToken', done => {
  // const metaName = 'source'
  // const token    = 'mind yours'

  // const meta = document.createElement('meta')
  // meta.id = 'statenet-getcsrftoken'
  // meta.name = metaName
  // meta.content = token
  // document.head.appendChild(meta)

  // const stateJson1 = store.getState()
  // stateJson1.net.csrfTokenName = metaName
  // const root1 = new State(stateJson1)
  // const net1 = new StateNet(stateJson1.net, root1)
  // expect(net1.csrfToken).toBe(token)
  // document.head.removeChild(meta);

  // (window as {[x: string]: any}).csrfTest = token
  // const stateJson2 = store.getState()
  // stateJson2.net.csrfTokenName = metaName
  // stateJson2.net.csrfTokenMethod = 'javascript'
  // const root2 = new State(stateJson2)
  // const net2 = new StateNet(stateJson2.net, root2)
  // expect(net2.csrfToken).toBe(token)

  done()
})