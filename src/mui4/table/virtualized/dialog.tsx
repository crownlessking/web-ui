
/**
 * Table dialog
 */

import React, { Component } from 'react'
import { TransitionProps } from '@material-ui/core/transitions'
import {
  Slide, Dialog, DialogContent, DialogContentText, DialogActions, Button,
  DialogTitle, PropTypes, SlideProps
} from '@material-ui/core'
import {
  getMetaDialogContentText, ISingleRow, getMetaDialogTitle,
  getMetaDialogShowActions, getMetaDialogOnSubmit, getMetaDialogActions
} from './controller'
import { IDelegated, IStateFormItem } from '../../../interfaces'
import Items from '../../form/items/local'
import { delegatedSetState, delegatedState, safelyGet, getDudEventCallback } from '../../../controllers'
import dateFormat from 'dateformat'
import StatePage from '../../../controllers/StatePage'

interface IProps {
  open: boolean
  onClose: () => void
  def: StatePage
  parentState: IDelegated
  classes?: any
}

export default class MaterialTableVirtualizedDialog extends Component<IProps> {

  render() {
    const {
      optionalDialogTitle: OptionalDialogTitle, transition: Transition,
      actions: Actions, props
    } = this
    const {
      open, onClose: handleClose, def: pageDef, parentState
    } = props
    const setState = delegatedSetState(parentState)
    const singleRow: ISingleRow = delegatedState(parentState, 'singleRow')
    const { title, key, type } = getMetaDialogTitle(pageDef, singleRow)
    const showActions = getMetaDialogShowActions(pageDef)
    const actions = getMetaDialogActions(pageDef)
    const onSubmit = getMetaDialogOnSubmit(pageDef)
    const classes = safelyGet(props,'classes',{})

    return (
      <Dialog
        fullWidth
        maxWidth={false}
        // scroll='paper'
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <OptionalDialogTitle
          className={classes.dialogTitle}
          id={`form-dialog-${key}`}
          type={type}
        >
          { title }
        </OptionalDialogTitle>
        <DialogContentText className={classes.dialogContentText}>
          { getMetaDialogContentText(pageDef) }
        </DialogContentText>
        <DialogContent className={classes.centeredDialogContent}>
          <form autoComplete='off' className={classes.form}>
            <Items
              row={singleRow}
              def={pageDef}
              setState={setState}
            />
          </form>
        </DialogContent>
        <Actions
          submission={onSubmit}
          actions={actions}
          show={showActions}
          close={handleClose}
        />
      </Dialog>
    )

  }

  private transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...(props as SlideProps)} />
  })

  /**
   * Sub-component to make the dialog title optional
   */
  private optionalDialogTitle = ({ id, className, type, children }: any) => {

    if (!children) {
      return ( null )
    }

    const formattedTitle = () => {
      switch (type) {
      case 'datetime':
        return dateFormat(children, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
      default:
        return children
      }
    }

    return (
      <DialogTitle id={id} className={className}>
        { formattedTitle() }
      </DialogTitle>
    )
  }

  /**
   * Renders default actions and user-defined actions
   */
  private actions = ({ show, close, actions, submission }: any) => {
    const actionsList: IStateFormItem[] = actions

    // user-defined actions
    if (actionsList && actionsList.length > 0) {
      return (
        <DialogActions>
          {actionsList.map(item => {
            if (item.type === 'submit' || item.type === 'button') {
              const has = item.has || {}
              let onClick
    
              // assigns the appropriate default callback based on 'handle'
              if (has.handle === 'defaultClose') {
                onClick = close
              } else if (has.handle === 'defaultSubmit') {
                onClick = submission
              }
    
              return (
                <Button
                  key={`action-${has.title}`}
                  onClick={onClick}
                  color={has.color as PropTypes.Color}
                >
                  { has.title }
                </Button>
              )
            }
            return ( null )
          })}
        </DialogActions>
      )
    }

    // default actions
    return show ? (
      <DialogActions>
        <Button
          onClick={close || getDudEventCallback()}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={submission || getDudEventCallback()}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    )
    : ( null )

  } // END actions()

  /**
   * Default dialog actions
   */
  private defaultActions = ({ show, close, submission }: any) => (
    show ? (
      <DialogActions>
        <Button
          onClick={close || getDudEventCallback()}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={submission || getDudEventCallback()}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    )
    : ( null )
  )

} // END class
