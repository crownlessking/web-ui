import { Fragment } from 'react'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { err, get_font_awesome_icon_prop } from 'src/controllers'
import { get_formatted_route } from 'src/controllers/StateLink'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import store, { IRedux, actions } from 'src/state'
import StateLink from 'src/controllers/StateLink'
import { Link as RouterLink } from 'react-router-dom'
import { Badge, Chip, SvgIcon } from '@mui/material'
import StateFormItemCustomChip from 'src/controllers/templates/StateFormItemCustomChip'

interface IJsonLinkProps { def: StateLink }

/**
 * [TODO] To update badge notification, the data needs to be retrieve from
 *        server and stored in the redux store. I recommend the `state.data`.
 *        The data retrieve from the server should have a unique id which can
 *        then be used as the property where the badged data is saved in
 *        `state.data`. Then retrieve the content of that property and set it
 *        as the value of badge content.
 */
export default function JsonLink ({ def }: IJsonLinkProps) {
  const { type, color, has } = def
  const redux: IRedux = { store, actions, route: has.route }
  const route = get_formatted_route(def)
  const menuItemsProps = def.parent.menuItemsProps
  const props = { ...menuItemsProps, ...def.props }
  const menuItemsSx = def.parent.menuItemsSx

  const linkTable: { [link: string]: () => JSX.Element } = {
    // normal link
    'link': () => (
      <Link
        component={RouterLink}
        variant='body2'
        color='inherit'
        sx={{
          ...menuItemsSx,
          fontFamily: def.parent.typography.fontFamily,
          color: def.parent.typography.color
        }}
        {...props}
        to={route}
        onClick={def.onClick(redux)}
      >
        { has.text }
      </Link>
    ),

    // Text looking like icon
    'text': () => (
      <Button
        component={RouterLink}
        color='inherit'
        aria-label={has.label}
        sx={{
          ...menuItemsSx,
          fontFamily: def.parent.typography.fontFamily,
          color: def.parent.typography.color
        }}
        {...props}
        to={route}
        onClick={def.onClick(redux)}
      >
        { has.text }
      </Button>
    ),

    'textlogo': () => (
      <Button
        component={RouterLink}
        color='inherit'
        aria-label={has.label}
        sx={{
          ...menuItemsSx,
          fontFamily: def.parent.typography.fontFamily,
          color: def.parent.typography.color
        }}
        {...props}
        to={route}
        onClick={def.onClick(redux)}
        style={{textTransform: 'none'}}
      >
        <Typography variant="h6" noWrap>
          { has.text }
        </Typography>
      </Button>
    ),

    // icon only
    'icon': () => {
      if (has.faIcon) {
        const icon = get_font_awesome_icon_prop(has.faIcon) as IconProp
        return (
          <IconButton
            component={RouterLink}
            color={color}
            aria-label={has.label}
            sx={{
              ...menuItemsSx,
              fontFamily: def.parent.typography.fontFamily,
              color: def.parent.typography.color
            }}
            {...props}
            to={route}
            onClick={def.onClick(redux)}
          >
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <FontAwesomeIcon {...has.iconProps} icon={icon} />
              </Badge>
            ) : (
              <FontAwesomeIcon {...has.iconProps} icon={icon} />
            )}
          </IconButton>
        )
      } else if (has.icon) {
        return (
          <IconButton
            component={RouterLink}
            color={color}
            aria-label={has.label}
            sx={{
              ...menuItemsSx,
              fontFamily: def.parent.typography.fontFamily,
              color: def.parent.typography.color
            }}
            {...props}
            to={route}
            onClick={def.onClick(redux)}
          >
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <SvgIcon {...has.iconProps}>{ has.icon }</SvgIcon>
              </Badge>
            ) : (
              <Icon {...has.iconProps}>{ has.icon }</Icon>
            )}
          </IconButton>
        )
      }
      err('Neither `has.icon` or `has.faIcon` is defined.')
      return <Fragment />
    },

    // The icon and the text
    'hybrid': () => {
      if (has.icon) {
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            sx={{
              ...menuItemsSx,
              fontFamily: def.parent.typography.fontFamily,
              color: def.parent.typography.color
            }}
            {...props}
            to={route}
            onClick={def.onClick(redux)}
          >
            {has.badge ? (
              <Badge
                color='error'
                {...has.badge}
                badgeContent='-' // store.data[badgeId]
              >
                <Icon {...has.iconProps}>{ has.icon }</Icon>
              </Badge>
            ) : (
              <Icon {...has.iconProps}>{ has.icon }</Icon>
            )}
            &nbsp;
            { has.text }
          </IconButton>
        )
      } else if (has.faIcon) {
        const icon = get_font_awesome_icon_prop(has.faIcon) as IconProp
        return (
          <IconButton
            component={RouterLink}
            color='inherit'
            aria-label={has.label}
            sx={{
              ...menuItemsSx,
              fontFamily: def.parent.typography.fontFamily,
              color: def.parent.typography.color
            }}
            {...props}
            to={route}
            onClick={def.onClick(redux)}
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
      err('Neither `has.icon` or `has.faIcon` is defined.')
      return <Fragment />
    },

    // Capsule or chip with avatar or just text
    'chip': () => {
      const chipHas = new StateFormItemCustomChip(has.state, def)
      return (
        <Chip
          label={chipHas.text}
          color={chipHas.color}
          { ...props}
        />
      )
    },

    'default': () => (
      <Link
        component={RouterLink}
        variant='body2'
        color='inherit'
        to={route}
        sx={{
          ...menuItemsSx,
          fontFamily: def.parent.typography.fontFamily,
          color: def.parent.typography.color
        }}
        {...props}
      >
        { has.text }
      </Link>
    ),

    // [TODO] Finish implementing the Dropdown Menu Link
    // It's a link, when clicked (or hovered) will show a drop-down
    'DROPDOWN': () => (
      <Fragment />
    )
  }

  return linkTable[type.toLowerCase()]()
}
