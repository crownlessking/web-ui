import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IState } from '../../interfaces'
import { closeDialog } from './actions'
import { dummyCallback } from '../../controllers'
import store from '../../state'
import appActions from '../../state/actions'
import { IFormDataPayload, updateFormData } from '../../state/forms/data/actions'
import { postReqState } from '../../state/net'
import { FormItems } from '../form/items'
import { getStateFormName } from '../../state/app'
import { createStyles, WithStyles, withStyles, PropTypes } from '@material-ui/core'
import StatePage from '../../controllers/StatePage'
import StateDialog from '../../controllers/StateDialog'

const styles = () => createStyles({
  dialogForm: {
    width: '500px',
    margin: 'auto'
  },
  dialogTitle: {
    margin: 'auto'
  },
  dialogContentText: {
    margin: 'auto'
  }
})

/**
 * Redux
 *
 * @param state 
 */
const mapStateToProps = (state: IState) => ({
  def: state.dialog,
  stateForms: state.forms,
  formsData: state.formsData,
})

const mapDispachToProps = {
  onCloseDialog: closeDialog,
  onUpdateFormData: updateFormData,
  onPostReqState: postReqState
}

interface IProps extends WithStyles<typeof styles> {
  pageDef: StatePage
  onUpdateFormData: (payload: IFormDataPayload) => void
  onPostReqState: (
    endpoint: string,
    body: RequestInit['body'],
    headers?: RequestInit['headers']
  ) => void
  onCloseDialog: () => void
}

/**
 * Example of how to create and show a dialog:
 *
 * ```js
 * setDialog({
 *    'title': 'title',
 *    'content': 'Hello World!',
 *    'open': true // opens the dialog right away
 * })
 * ```
 *
 * @see IStateDialog
 */
class ResponsiveDialog extends React.Component<IProps> {

  onCloseDialog = () => {
    this.props.onCloseDialog()
  }

  render() {
    const {
      props: { pageDef },
      dialogWithFormContent: DialogWithFormContent,
      dialogWithArbitraryContent: DialogWithArbitraryContent
    } = this

    const { content, contentType } = pageDef.parent.parent.dialog

    // If the dialog will display a generated form
    if (contentType === 'form'
      && content
      && (typeof content === 'string')
    ) {
      return ( <DialogWithFormContent /> )  

    // If the dialog will display anything else
    } else {
      return ( <DialogWithArbitraryContent /> )
    }
  } // END render()

  /**
   * Dialog containing a form
   */
  dialogWithFormContent = () => {
    const {
      props: { pageDef, classes },
      dialogActions: DialogActions
    } =  this
    const { open, contentText, title, content } = pageDef.parent.parent.dialog

    const dialogPageDef = new StatePage({ content }, pageDef.parent)

    return (
      <Dialog
        open={open}
        onClose={this.onCloseDialog}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle
          className={classes.dialogTitle}
          id='responsive-dialog-title'
        >
          { title }
        </DialogTitle>
        <DialogContentText
          className={classes.dialogContentText}
        >
          { contentText }
        </DialogContentText>
        <DialogContent>
          <div className={classes.dialogForm}>
            <form autoComplete='off'>
              <FormItems def={dialogPageDef} />
            </form>
          </div>
        </DialogContent>
        <DialogActions def={pageDef.parent.parent.dialog} />
      </Dialog>
      )
  } // END dialogFormContent()

  /**
   * Dialog containing any type of content except a form generated using a
   * `stateForm`.
   */
  dialogWithArbitraryContent = () => {
    const { pageDef, classes } = this.props
    const dialogDef = pageDef.parent.parent.dialog
    const { open, content, contentText, title } = dialogDef
    const { dialogActions: DialogActions } = this

    return (
      <Dialog
        open={open}
        onClose={this.onCloseDialog}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle
          className={classes.dialogTitle}
          id='responsive-dialog-title'
        >
          { title }
        </DialogTitle>
        <DialogContentText
          className={classes.dialogContentText}
        >
          { contentText }
        </DialogContentText>
        <DialogContent>{ content }</DialogContent>
        <DialogActions def={dialogDef} />
      </Dialog>
    )
  } // END dialogWithArbitraryContent()

  /**
   * Buttons at the bottom of the dialog window.
   *
   * **Example** of how to define these buttons
   * ```js
   * const dialogDef = {
   *    // ...
   *    'actions': [
   *      {
   *        'callback': (store: Store)=>()=>void
   *        'has': {
   *          'title': 'Button Title',
   *        }
   *      },
   *      // ... more button definitions
   *    ]
   * }
   * ```
   *
   * @param props 
   */
  private dialogActions = ({ def }: { def: StateDialog }) => {
    const actions = def.actions || []
    const actionsJsx = actions.map((action, index) => {
      if (action.has.title) {
        const callback = action.has.json.callback || this.getDefaultCallback()
        index += 2
        return (
          <Button
            key={index}
            color={action.has.color as PropTypes.Color || 'default'}
            onClick={callback({store, actions: appActions})}
          >
            { action.has.title }
          </Button>
        )
      }
      return ( null )
    })
    return (
      <DialogActions>
        {[
          <Button key={1} onClick={this.onCloseDialog} color='secondary' autoFocus>
            Close
          </Button>,
          ...actionsJsx
        ]}
      </DialogActions>
    )
  }

  /**
   * Saves the form field value to the store.
   *
   * Note: this process is automatic
   *
   * Redux action
   *
   * @param name name of form field
   */
  onUpdateFormData = () => (e: any) => {
    const { pageDef: page } = this.props
    const { content } = page.parent.parent.dialog

    if (content && (typeof content === 'string')) {
      const name = page.contentName
      const formName = getStateFormName(name)
      const { value } = e.target
      this.props.onUpdateFormData({ formName, name, value })
    }
  }

  /**
   * Redux dispatch function integration
   *
   * @param endpoint
   * @param body
   */
  onPostReqState = (endpoint: string, body: RequestInit['body']) => {
    this.props.onPostReqState(endpoint, body)
  }

  /**
   * Get a default callback for the dialog action buttons.
   */
  getDefaultCallback = () => {
    const { pageDef: page } = this.props
    const { dialog: { content }, formsData } = page.parent.parent

    // assumes that the dialog contains a form if both these fields are set.
    if (content && (typeof content === 'string')) {
      return () => (e: any) => {
        const formName = getStateFormName(page.contentName)
        const body = formsData.get(formName) // this.props.formsData[formName]
        this.onPostReqState(page.contentEndpoint, body)
      }
    } else {
      return dummyCallback
    }
  }

} // END class ResponsiveDialog

export default connect(mapStateToProps, mapDispachToProps)
(
  withStyles(styles)
  (
    ResponsiveDialog
  )
)
