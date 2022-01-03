import { Component } from 'react'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFontAwesomeIconProp, getFormattedRoute } from '../../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import store from '../../state'
import actions from '../../state/actions'
import StateLink, { getLinkProps } from '../../controllers/StateLink'
import { Link as RouterLink } from 'react-router-dom'
import { Badge } from '@mui/material'

interface IJsonLinkProps { def: StateLink }

/**
 * [TODO] To update badge notification, the data needs to be retrieve from
 *        server and stored in the redux store. I recommend the `state.data`.
 *        The data retrieve from the server should have a unique id which can
 *        then be used as the property where the badged data is saved in
 *        `state.data`. Then retrieve the content of that property and set it
 *        as the value of badge content.
 */
export default class JsonLink extends Component<IJsonLinkProps> {

  public render() {
    const { def } = this.props
    const { type, has, onClick } = def
    const redux = { store, actions, route: has.route }
    const route = getFormattedRoute(def, has.route)
    const props = getLinkProps(def.json)
    const menuItemStyle = {
      fontFamily: def.parent.typography.fontFamily
    }

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
          style={menuItemStyle}
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
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <Icon>{ has.icon }</Icon>
              </Badge>
            ) : (
              <Icon>{ has.icon }</Icon>
            )}
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
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <FontAwesomeIcon icon={icon} />
              </Badge>
            ) : (
              <FontAwesomeIcon icon={icon} />
            )}
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
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <Icon>{ has.icon }</Icon>
              </Badge>
            ) : (
              <Icon>{ has.icon }</Icon>
            )}
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
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <FontAwesomeIcon icon={icon} />
              </Badge>
            ) : (
              <FontAwesomeIcon icon={icon} />
            )}
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
