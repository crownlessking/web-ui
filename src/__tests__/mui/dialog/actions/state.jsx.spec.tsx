import renderer from 'react-test-renderer'
import IStateFormItem from '../../../../interfaces/IStateFormItem'
import StateJsxDialogAction from '../../../../mui/dialog/actions/state.jsx'

describe('src/mui/dialog/actions/state.jsx', () => {
  it('should render correctly', () => {
    const actions = [

      // [TODO] Dialog action is an array of form items

    ] as IStateFormItem[]
    const tree = renderer
      .create(<StateJsxDialogAction
        def={actions}
        parent={{} as any}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})