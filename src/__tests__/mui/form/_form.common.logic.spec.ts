import * as F from '../../../mui/form/_form.common.logic'
import IStateDialog from '../../../interfaces/IStateDialog'
// import IStateFormItem from '../../../interfaces/IStateFormItem'

describe('mui/form/_form.common.logic.ts', () => {
  describe('get_bool_type', () => {
    const bool = F.get_bool_type('true')
    expect(bool).toEqual(true)

    // TODO - add more tests
  })

  describe('to_bool_val', () => {
    const bool = F.to_bool_val('true')
    expect(bool).toEqual(true)

    // TODO - add more tests
  })

  describe('gen_state_form', () => {
    const rowData = {
      id: 1,
      name: 'name',
      description: 'description',
      active: true,
      created_at: '2019-01-01',
      updated_at: '2019-01-01'
    }
    const stateForm = F.gen_state_form(rowData)
    expect(stateForm).toEqual({
      id: {
        type: 'number',
        value: 1
      },
      name: {
        type: 'string',
        value: 'name'
      },
      description: {
        type: 'string',
        value: 'description'
      },
      active: {
        type: 'boolean',
        value: true
      },
      created_at: {
        type: 'string',
        value: '2019-01-01'
      },
      updated_at: {
        type: 'string',
        value: '2019-01-01'
      }
    })

    // TODO - add more tests
  })

  describe('set_form_values', () => {
    const dialog: IStateDialog = {
      open: false,
      title: '',
      actions: [],
    }
    const rowData = {
      id: 1,
      name: 'name',
      description: 'description',
      active: true,
      created_at: '2019-01-01',
      updated_at: '2019-01-01'
    }
    const stateFormValues = F.set_form_values(dialog, rowData)
    expect(stateFormValues).toEqual({
      id: {
        type: 'number',
        value: 1
      },
      name: {
        type: 'string',
        value: 'name'
      },
      description: {
        type: 'string',
        value: 'description'
      },
      active: {
        type: 'boolean',
        value: true
      },
      created_at: {
        type: 'string',
        value: '2019-01-01'
      },
      updated_at: {
        type: 'string',
        value: '2019-01-01'
      }
    })

    // TODO - add more tests
  })
})