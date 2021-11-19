import React from 'react'
import { IStateFormItem, IStateLink } from '../interfaces'
import { createStyles, Icon, withStyles, WithStyles } from '@material-ui/core'
import { getFontAwesomeIconProp } from '../controllers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getSvgIcon from './imported.svg.icons'
import { getOrigin } from '../state/app/controller'

const styles = () => createStyles({
  '@font-face': {
    fontFamily: 'Material Icons',
    fontStyle: 'normal',
    fontWeight: 400,
    src: "local('Matrial Icons'),"
          + "local('MaterialIcons-Regular'),"
          + `url(${getOrigin()}MaterialIcons-Regular.woff2) format('woff2'),`
          + `url(${getOrigin()}MaterialIcons-Regular.woff) format('woff'),`
          + `url(${getOrigin()}MaterialIcons-Regular.ttf) format('truetype')`,
  },
  materialIcons: {
    fontFamily: 'Material Icons',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '24px',
    display: 'inline-block',
    lineHeight: 1,
    textTransform: 'none',
    letterSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'nowrap',
    direction: 'ltr',

    /* Support for all WebKit browsers. */
    WebkitFontSmoothing: 'antialiased',
    /* Support for Safari and Chrome. */
    textRendering: 'optimizeLegibility',

    /* Support for Firefox. */
    MozOsxFontSmoothing: 'grayscale',

    /* Support for IE. */
    fontFeatureSettings: 'liga'
  }
})

interface IProps extends WithStyles<typeof styles> {
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
 */
export default withStyles(styles)(function getJsonIcon (
  { json, svgProps, muiProps, faProps, classes }: IProps
) {
  const has = json.has || {}
  const props = has.props
  if (has.icon) {
    return getSvgIcon(has.icon,  { ...props, ...svgProps })
      || <Icon {...props} {...muiProps}>{ has.icon }</Icon>
  } else if (has.faIcon) {
    const icon = getFontAwesomeIconProp(has.faIcon) as IconProp
    return <FontAwesomeIcon icon={icon} {...props} {...faProps} />
  } else if (has.matIcon) {

    // more info: https://google.github.io/material-design-icons/
    return (
      <span className={classes.materialIcons}>
        { has.matIcon }
      </span>
    )
  }

  return ( null )
})
