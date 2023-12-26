import StatePage from '../../../controllers/StatePage'
import StatePageAppbarMidSearch from '../../../controllers/templates/StatePageAppbarMidSearch'

describe('StatePageAppbarMidSearch', () => {
  describe('constructor', () => {
    it('should create a state page appbar mid search object', () => {
      expect(new StatePageAppbarMidSearch(
        {},
        {} as StatePage
      )).toEqual({ _defaultState: {} })
    })
  })
})