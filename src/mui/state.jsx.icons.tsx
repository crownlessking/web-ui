import { Icon } from '@mui/material'
import { get_font_awesome_icon_prop } from '../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getSvgIcon from './imported.svg.icons'
import StateFormItemCustom from '../controllers/StateFormItemCustom'

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
export default function StateJsxIcon ({ def: has }: IJsonIconProps) {
  if (has.icon) {
    return getSvgIcon(has.icon, has.iconProps)
      || <Icon {...has.iconProps}>{ has.icon }</Icon>
  } else if (has.faIcon) {
    const faProps: any = { size: 'lg', ...has.iconProps }
    const faIcon = get_font_awesome_icon_prop(has.faIcon)
    return <FontAwesomeIcon icon={faIcon as IconProp} {...faProps} />
  }

  return ( null )
}
