import { Icon } from '@mui/material'
import { getFontAwesomeIconProp } from '../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getSvgIcon from './imported.svg.icons'
import StateFormItem from '../controllers/StateFormItem'
import StateLink from '../controllers/StateLink'
import _ from 'lodash'

interface IGetJsonIconProps {
  def: StateFormItem | StateLink
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
export default function getJsonIcon ({ def }: IGetJsonIconProps) {
  const has = def.has
  if (def.has.icon) {
    return getSvgIcon(def.has.icon, def.props)
      || <Icon {...def.props}>{ has.icon }</Icon>
  } else if (def.has.faIcon) {
    const faProps: any = _.extend({ size: 'lg' }, def.props)
    const faIcon = getFontAwesomeIconProp(def.has.faIcon)
    return <FontAwesomeIcon icon={faIcon as IconProp} {...faProps} />
  }

  return ( null )
}
