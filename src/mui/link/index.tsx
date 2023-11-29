import { Fragment } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import StateLink, { get_formatted_route } from '../../controllers/StateLink'
import store, { IRedux, actions } from '../../state'
import { Link as RouterLink } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import StateFormItemCustomChip from '../../controllers/templates/StateFormItemCustomChip'
import StateJsxBadgedIcon from '../state.jsx.icons'

interface IJsonLinkProps {
  def: StateLink
  children?: any
}

/**
 * [TODO] To update badge notification, the data needs to be retrieve from
 *        server and stored in the redux store. I recommend the `state.data`.
 *        The data retrieve from the server should have a unique id which can
 *        then be used as the property where the badged data is saved in
 *        `state.data`. Then retrieve the content of that property and set it
 *        as the value of badge content.
 */
export default function StateJsxLink ({ def, children }: IJsonLinkProps) {
  const { type, color, has } = def
  const redux: IRedux = { store, actions, route: has.route }
  const route = get_formatted_route(has)
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

    'svg': () => (
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
        style={{ textTransform: 'none' }}
      >
        { children }
      </IconButton>
    ),

    'svg_right': () => (
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
        style={{ textTransform: 'none' }}
      >
        { has.text }
        &nbsp;
        { children }
      </IconButton>
    ),

    'svg_left': () => (
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
        style={{ textTransform: 'none' }}
      >
        { children }
        &nbsp;
        { has.text }
      </IconButton>
    ),

    // icon only
    'icon': () => (
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
        <StateJsxBadgedIcon def={has} />
      </IconButton>
    ),

    // The icon and the text
    'hybrid': () => (
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
        <StateJsxBadgedIcon def={has} />
        &nbsp;
        { has.text }
      </IconButton>
    ),

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
