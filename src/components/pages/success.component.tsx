import { makeStyles } from '@mui/styles'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import StatePage from '../../controllers/StatePage'
import { getPageName } from '../../controllers'

const useStyles = makeStyles(() => ({
  resultSymbol: {
    fontSize: '29.5rem !important'
  },
  messageDiv: {
    width: '100%',
    textAlign: 'center'
  }
}))

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
export default function PageSuccess ({ def: page }:{ def: StatePage }) {
  const classes = useStyles()
  const route = page.parent.parent.app.route
  const pageName = getPageName(route)
  const msg = page.parent.parent.tmp.get(
    pageName,
    'message',
    page.data.message
  )

  return (
    <>
      <CheckCircleOutlineIcon
        className={classes.resultSymbol}
        htmlColor={page.typography.color}
      />
      <div
        className={classes.messageDiv}
        style={{color: page.typography.color}}
      >
        <h1>{ msg }</h1>
      </div>
    </>
  )

}
