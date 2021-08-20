import React from 'react'
import { IStateFormItem, IStateLink } from '../interfaces'
import { Icon } from '@material-ui/core'
import { getFontAwesomeIconProp } from '../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getSvgIcon from './imported.svg.icons'

interface IProps {
  json: IStateFormItem | IStateLink,

  /** Set props for `@material-ui/icons`. */
  svgProps?: any

  /** Set props for `<Icon />` */
  muiProps?: any

  /** Set props for `<FontAwesomeIcon />` */
  faProps?: any
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
 * @param param0 
 */
export default function({ json, svgProps, muiProps, faProps }: IProps) {
  const has = json.has || {}
  const props = has.props
  if (has.icon) {
    return getSvgIcon(has.icon,  { ...props, ...svgProps })
      || <Icon {...props} {...muiProps}>{ has.icon }</Icon>
  } else if (has.faIcon) {
    const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
    return <FontAwesomeIcon icon={icon} {...props} {...faProps} />
  }
  return ( null )
}
