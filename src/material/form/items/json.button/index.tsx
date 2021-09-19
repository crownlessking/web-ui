import React, { Component } from 'react'
import {
  Button, Theme, createStyles, WithStyles, withStyles, Icon
} from '@material-ui/core'
import { IStateFormItemCustom } from '../../../../interfaces'
import { getButtonProps } from './json.button.c'
import { getFontAwesomeIconProp } from '../../../../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import store from '../../../../state'
import allActions from '../../../../state/actions'
import StateFormItem from '../items.controller'

const styles = ({ spacing }: Theme) => createStyles({
  button: {
    margin: spacing(1),
  },
})

interface IProps extends WithStyles<typeof styles> {
  def: StateFormItem
}

export default withStyles(styles)(class extends Component<IProps> {

  /**
   * For more information on valid props:
   *
   * @see https://material-ui.com/api/button/#props
   */
  public render() {
    const { classes, def: button } = this.props
    const { buttonContent: ButtonContent } = this
    const redux = {
      store,
      actions: allActions,
      route: button.json.href
    }
    const onClick = button.onClick || button.has.callback
  
    const props = getButtonProps(button.json)
    return (
      <Button
        className={classes.button}
        variant={button.has.variant as any}
        color={button.has.color as any}
        onClick={onClick(redux)}
        {...props}
      >
        <ButtonContent has={button.has} />
      </Button>
    )
  }

  private buttonContent(props: any) {
    const has: IStateFormItemCustom = props.has.json
    if (props.value || has.title) {
      switch (has.iconPosition) {

      // icon is located on the right of the button title
      case 'right':
        if (has.icon) {
          return (
            <React.Fragment>
              { has.title }
              &nbsp;
              <Icon>{ has.icon }</Icon>
            </React.Fragment>
          )
        } else if (has.faIcon) {
          const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
          return (
            <React.Fragment>
              { has.title }
              &nbps;
              <FontAwesomeIcon icon={icon} />
            </React.Fragment>
          )
        }
        break

      // icon is located on the left of the button title
      case 'left':
      default:
        if (has.icon) {
          return (
            <React.Fragment>
              <Icon>{ has.icon }</Icon>
              &nbsp;
              { has.title }
            </React.Fragment>
          )
        } else if (has.faIcon) {
          const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
          return (
            <React.Fragment>
              <FontAwesomeIcon icon={icon} />
              &nbsp;
              { has.title }
            </React.Fragment>
          )
        }

      } // END switch

      return <React.Fragment>{ has.title }</React.Fragment>
    } else {
      if (has.icon) {
        return <Icon>{ has.icon }</Icon>
      } else if (has.faIcon) {
        const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
        return <FontAwesomeIcon icon={icon} />
      }
    }
    return ( null )
  } // END buttonContent

})
