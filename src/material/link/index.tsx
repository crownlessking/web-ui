import React, { Component } from 'react'
import { Link, IconButton, Icon, Button, Typography } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getFontAwesomeIconProp,
  getFormattedRoute,
  defaultCallback
} from '../../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import store from '../../state'
import actions from '../../state/actions'
import StateLink, { getLinkProps } from './controller'
import { Link as RouterLink } from 'react-router-dom'

interface IProps { def: StateLink }

export default class JsonLink extends Component<IProps> {

  public render() {
    const { def } = this.props
    const { type } = def
    const href: string = def.get('href')
    const redux = { store, actions, route: href }
    const has = def.has || {}
    const route = getFormattedRoute(def, href)
    const onClick = def.onClick || defaultCallback
    const props = getLinkProps(def.json)

    switch (type) {

    // normal link
    case 'link':
      return (
        <Link
          component={RouterLink}
          variant='body2'
          color='inherit'
          {...props}
          to={route}
          onClick={onClick(redux)}
        >
          { has.text }
        </Link>
      )

    // Text looking like icon
    case 'text':
      return (
        <Button
          component={RouterLink}
          color='inherit'
          aria-label={has.label}
          {...props}
          to={route}
          onClick={onClick(redux)}
        >
          { has.text }
        </Button>
      )

    case 'textlogo':
      return (
        <Button
          component={RouterLink}
          color='inherit'
          aria-label={has.label}
          {...props}
          to={route}
          onClick={onClick(redux)}
          style={{textTransform: 'none'}}
        >
          <Typography variant="h6" noWrap>
            { has.text }
          </Typography>
        </Button>
      )

    // icon only
    case 'icon':
      if (has.icon) {
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            {...props}
            to={route}
            onClick={onClick(redux)}
          >
            <Icon>{ has.icon }</Icon>
          </IconButton>
        )
      } else if (has.faIcon) {
        const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            {...props}
            to={route}
            onClick={onClick(redux)}
          >
            <FontAwesomeIcon icon={icon} />
          </IconButton>
        )
      }
      break

    // The icon and the text
    case 'hybrid':
      if (has.icon) {
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            {...props}
            to={route}
            onClick={onClick(redux)}
          >
            <Icon>{ has.icon }</Icon>
            &nbsp;
            { has.text }
          </IconButton>
        )
      } else if (has.faIcon) {
        const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            {...props}
            to={route}
            onClick={onClick(redux)}
          >
            <FontAwesomeIcon icon={icon} />
            &nbsp;
            { has.text }
          </IconButton>
        )
      }
      return (
        <Link
          component={RouterLink}
          variant='body2'
          color='inherit'
          to={route}
          {...props}
        >
          { has.text }
        </Link>
      )

    } // END switch
  } // END render()

}
