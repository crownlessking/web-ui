import React from 'react'
import { makeStyles } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import StatePage from '../../controllers/StatePage'
import { getPageName } from '../../state/pages'

const FONT_COLOR = '#74d2b3'  

const useStyles = makeStyles(() => ({
  resultSymbol: {
    fontSize: '300px'
  },
  messageDiv: {
    width: '100%',
    textAlign: 'center',
    color: FONT_COLOR
  }
}))

interface IProps {
  def: StatePage
}

/**
 * Displays a generic page that indicates a successful operation.
 *
 * example:
 * ```tsx
 * <SuccessPage endpoint={endpoint} state={state} />
 * ```
 * ##### Variables
 * `message`: text to be displayed on the success page.
 *
 * example:
 * ```ts
 * displayPage('success', {
 *    message: 'I\'ll show up at the bottom of the page'
 * })
 * ```
 *
 * Tags: `success`, `page`, `message`
 */
export default function PageSuccess ({ def: page }: IProps) {
  const classes = useStyles()
  const route = page.parent.parent.app.route
  const pageName = getPageName(route)
  let msg: string = ''
  try {
    // const message = page.parent.parent.tmp.state[pageName].message || ''
    msg = page.parent.parent.tmp.get(pageName, 'message', page.data.message)
  } catch (e) {}
  return (
    <>
      <CheckCircleOutlineIcon
        className={classes.resultSymbol}
        htmlColor={FONT_COLOR}
      />
      <div className={classes.messageDiv}>
        <h1>{ msg }</h1>
      </div>
    </>
  )

}
