import React, { Component } from 'react'
import { IState, IStateDialogForm } from '../../../interfaces'
import {
  BREAK_LINE, BUTTON, SUBMIT, HTML, SELECT, NUMBER, PASSWORD, TEXTFIELD,
  TEXTAREA, RADIO_BUTTONS, CHECKBOXES, SWITCH, HIGHLIGHT
} from '../controller'
import { Theme } from '@mui/material'
import { createStyles, WithStyles, withStyles } from '@mui/styles'
import { connect } from 'react-redux'
import JsonButton from './json.button'
import JsonSelect from './json.select'
import JsonTextfield from './json.textfield'
import JsonRadio from './json.radio'
import JsonCheckboxes from './json.checkboxes'
import JsonSwitch from './json.switch'
import { getProps, updateCheckboxes } from './controller'
import {
  BOOL_TRUEFALSE, BOOL_ONOFF, BOOL_YESNO, getBoolType, setFormValues,
  genStateForm
} from '../controller'
import { postRequest } from '../../../state/net'
import { ISingleRow, getMetaDialog } from '../../table/virtualized/controller'
import Highlight from 'react-highlight.js'
import '../../../styles/atelier-forest-light.css'
import StatePage from '../../../controllers/StatePage'
import StateDialogForm from '../../../controllers/StateDialogForm'
import StateFormItemSelect from '../../../controllers/StateFormItemSelect'
import StateFormItemRadio from '../../../controllers/StateFormItemRadio'

const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    margin: spacing(0, 1, 1, 1),
    // width: 300,
  },
  highlight: { fontWeight: 'bold' }
})

const mapStateToProps = (state: IState) => ({
  stateMeta: state.meta
})

const mapDispatchToProps = { postRequest }

interface IProps extends WithStyles<typeof styles> {
  row?: ISingleRow
  def: StatePage
  setState: (formData: any) => void
  postRequest: (
    endpoint: string,
    body: RequestInit['body'],
    success?: () => void
  ) => void
}

interface ILocalState {
  formData: any
  stateDialog: IStateDialogForm
}

export default
connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)
(class extends Component<IProps, ILocalState> {

  constructor (props: any) {
    super(props)
    this.state = {
      formData: {},
      stateDialog: { items: [] }
    }
  }

  UNSAFE_componentWillMount() {
    this.setFormValues()
  }

  setFormValues = () => {
    const formData: any = {}
    const rowData = this.props.row && this.props.row.rowData
    const stateDialog = this.getStateDialog()
    this.setState({ stateDialog })
    for (let i = 0; i < stateDialog.items.length; i++) {
      const item = stateDialog.items[i]
      if (item.name) {
        formData[item.name] = rowData[item.name]
      }
    }
    this.setState({ formData })
  }

  getStateDialog = () => {
    const page = this.props.def
    const row  = this.props.row

    // Use the pageState.meta.dialog to define your own formState
    let stateDialog = getMetaDialog(page)

    if (stateDialog.items.length > 0) {
      setFormValues(stateDialog, row)
    } else {
      stateDialog = genStateForm(row)
    }

    return stateDialog
  }

  render() {
    const { classes, def: page } = this.props
    const dialog = new StateDialogForm(this.state.stateDialog, page)
  
    return dialog.items.map((formField, index) => {
      // formField.disabled = (formField.disabled === undefined)
      //   ? true
      //   : formField.disabled
      const { type: fieldType } = formField
      // itemDef.value = getLocallyStoredValue(formData, itemDef)
      const state = { state: this.state, setState: this.setState }
      formField.has.classes = classes
      const key = `local-${index}`

      switch (fieldType.toUpperCase()) {

      case BREAK_LINE:
        return <br key={key} />

      case BUTTON:
        return <JsonButton key={key} def={formField} />

      case SUBMIT:
        formField.onClick = this.onFormSubmitDefault
        return <JsonButton key={key} def={formField} />

      case HTML:
        if (formField.has.content) {
          return (
            <div
              key={key}
              dangerouslySetInnerHTML={{__html: formField.has.content}}
              {...getProps(formField.json)}
            />
          )
        }
        break

      case SELECT:
        formField.onChange = this.onUpdateFormData
        return <JsonSelect key={key} def={formField as StateFormItemSelect} state={state} />

      case TEXTAREA:
      case NUMBER:
      case PASSWORD:
      case TEXTFIELD:
        formField.onChange = this.onUpdateFormData
        return <JsonTextfield key={key} def={formField} state={state} />
      case HIGHLIGHT:
        try {
          return (
            <React.Fragment key={key}>
              <span>{formField.label || formField.name}</span>
              <div className={classes.highlight}>
                <Highlight language={formField.language}>
                  { JSON.stringify(JSON.parse(formField.json.value), null, 2) }
                </Highlight>
              </div>
            </React.Fragment>
          )
        } catch (e) {
          return (
            <React.Fragment key={key}>
              <span>{formField.label || formField.name}</span>
              <pre>{ formField.json.value }</pre>
            </React.Fragment>
          )
        }

      case RADIO_BUTTONS:
        formField.onChange = this.onUpdateFormData
        return <JsonRadio key={key} def={formField as StateFormItemRadio} state={state} />

      case CHECKBOXES:
        formField.onChange = this.onHandleCheckbox
        return <JsonCheckboxes key={key} def={formField} state={state} />

      case SWITCH:
        formField.onChange = this.onHandleSwitch
        return <JsonSwitch key={key} def={formField} state={state} />

      }

      return ( null )
    })

  } //*/ render() END

  /**
   * Saves the form field value to the local state.
   *
   * Note: this process is automatic
   *
   * Redux action
   *
   * @param name
   */
  onUpdateFormData = (name: string) => (e: any) => {
    const { formData } = this.state
    this.setState({formData: {
      ...formData,
      [name]: e.target.value
    }})
  }

  /**
   * Saves checkboxes values to the local state.
   *
   * @param name
   * @param oldValue
   */
  onHandleCheckbox = (name: string, oldValue: any) => (e: any) => {
    const { formData } = this.state
    let value = oldValue ? oldValue : []
    value = updateCheckboxes(value, e.target.value, e.target.checked)
    this.setState({formData: {
      ...formData,
      [name]: value
    }})
  }

  /**
   * Save `<Switch>` value to the local state.
   *
   * @param name
   * @param boolType
   */
  onHandleSwitch = (name: string, value: any) => (e: any) => {
    const { formData } = this.state
    switch (getBoolType(value)) {
    case BOOL_TRUEFALSE:
      this.setState({formData: {
        ...formData,
        [name]: e.target.checked ? 'true' : 'false'
      }})
      break
    case BOOL_ONOFF:
      this.setState({formData: {
        ...formData,
        [name]: e.target.checked ? 'on' : 'off'
      }})
      break
    case BOOL_YESNO:
      this.setState({formData: {
        ...formData,
        [name]: e.target.checked ? 'yes' : 'no'
      }})
      break
    default:
      this.setState({formData: {
        ...formData,
        [name]: e.target.checked
      }})
    }
  } // onHandleSwitch() END

  /**
   * A default form submission callback if none was provided.
   */
  onFormSubmitDefault = () => (e: any) => {
    const { state : { formData }, props: { def } } = this
    postRequest(def.contentEndpoint, formData, () => {
      // TODO Implement the logic for updating the local row data after changes
      //      are saved to the server.
    })
  }

})) // class END
