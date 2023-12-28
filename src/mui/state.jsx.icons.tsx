import { Badge, Icon } from '@mui/material'
import { get_font_awesome_icon_prop } from '../controllers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getSvgIcon from './state.jsx.imported.svg.icons'
import StateFormItemCustom from '../controllers/StateFormItemCustom'
import { Fragment } from 'react'
import { TIconName } from 'src/interfaces/TIconName'

interface IJsonIconProps {
  def: StateFormItemCustom<any> // StateFormItem | StateLink
}

/**
 * e.g.
 * ```ts
 * const item = {
 *    has: {
 *       icon: '',
 *       faIcon: ''
 *    }
 * }
 * ```
 */
export function StateJsxIcon ({ def: has }: IJsonIconProps) {
  const map: Record<string, () => JSX.Element> = {
    svgIcon: () => getSvgIcon(has.svgIcon, has.iconProps)
      || <Icon {...has.iconProps}>{ has.svgIcon }</Icon>,
    icon: () => getSvgIcon(has.icon as TIconName, has.iconProps)
      || <Icon {...has.iconProps}>{ has.icon }</Icon>,
    faIcon: () => {
      const faProps: any = { size: 'lg', ...has.iconProps }
      const faIcon = get_font_awesome_icon_prop(has.faIcon)
      return <FontAwesomeIcon icon={faIcon} {...faProps} />
    },
    none: () => <Fragment>❌</Fragment>
  }
  const type = has.svgIcon
    ? 'svgIcon'
    : has.icon
      ? 'icon'
      : has.faIcon
        ? 'faIcon'
        : 'none'
  return map[type]()
}

export default function StateJsxBadgedIcon ({ def: has }: IJsonIconProps) {
  return (
    <Fragment>
      {has.badge ? (
        <Badge
          color='error'
          {...has.badge}
          badgeContent='-'
        >
          <StateJsxIcon def={has} />
        </Badge>
      ): (
        <StateJsxIcon def={has} />
      )}
    </Fragment>
  )
}
