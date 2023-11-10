import { Fragment } from 'react'
import { Icon, Button } from '@mui/material'
import store, { actions } from 'src/state'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { get_font_awesome_icon_prop } from '../../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import StateFormItemCardAction from 'src/controllers/templates/StateFormItemCardAction'

type TMapIcon = {
  [K in 'icon'|'faIcon'|'none']: () => JSX.Element
}

type TMapPosition = {
  [K in 'left'|'right']: TMapIcon
}

export default function StateJsxCardActionButton (
  { def: button }: { def: StateFormItemCardAction }
) {
  const redux = {
    store,
    actions,
    route: button.props.href
  }
  const onClick = button.onClick

  const mapRight: TMapIcon = {
    icon: () => (
      <Fragment>
        { button.text }
        &nbsp;
        <Icon>{ button.has.icon }</Icon>
      </Fragment>
    ),
    faIcon: () => {
      const icon = get_font_awesome_icon_prop(button.has.faIcon) as IconProp
      return (
        <Fragment>
          { button.value }
          &nbps;
          <FontAwesomeIcon icon={icon} />
        </Fragment>
      )
    },
    'none': () => (
      <Fragment>
        { button.text }
      </Fragment>
    )
  }

  const mapLeft: TMapIcon = {
    icon: () => (
      <Fragment>
        <Icon>{ button.has.icon }</Icon>
        &nbsp;
        { button.text }
      </Fragment>
    ),
    faIcon: () => {
      const icon = get_font_awesome_icon_prop(button.has.faIcon) as IconProp
      return (
        <Fragment>
          <FontAwesomeIcon icon={icon} />
          &nbsp;
          { button.text }
        </Fragment>
      )
    },
    'none': () => (
      <Fragment>
        { button.text }
      </Fragment>
    )
  }

  const map: TMapPosition = {
    left: mapLeft,
    right: mapRight
  }

  if (button.text) {
    const iconPosition = button.has.iconPosition ?? 'left'
    const iconType = button.has.faIcon
      ? 'faIcon'
      : button.has.icon ? 'icon' : 'none'
    const buttonContent = map[iconPosition][iconType]()
    return (
      <Button
        {...button.props}
        onClick={onClick(redux)}
      >
        { buttonContent }
      </Button>
    )
  }
  if (button.has.icon) {
    return (
      <Button
        {...button.props}
        onClick={onClick(redux)}
      >
        <Icon>{ button.has.icon }</Icon>
      </Button>
    )
  }
  if (button.has.faIcon) {
    const icon = get_font_awesome_icon_prop(button.has.faIcon) as IconProp
    return (
      <Button
        {...button.props}
        onClick={onClick(redux)}
      >
        <FontAwesomeIcon icon={icon} />
      </Button>
    )
  }
  return (
    <Button
      {...button.props}
      onClick={onClick(redux)}
    >
      ❌ No Text!
    </Button>
  )
}