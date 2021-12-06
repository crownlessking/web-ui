import { makeStyles } from '@material-ui/core'
import StatePage from '../../controllers/StatePage'
import { getPageName } from '../../state/pages'

const useStyles = makeStyles(() => ({
  resultSymbol: {
    width: '100%',
    fontSize: '200px',
    textAlign: 'center',
    margin: 0
  },
  messageDiv: {
    width: '100%',
    fontSize: '32px',
    textAlign: 'center',
    margin: 0
  }
}))

export default function PageNotFound ({ def: page }: { def: StatePage }) {
  const classes = useStyles()
  const pageName = getPageName(page.parent.parent.app.route)
  const message = page.parent.parent.tmp.get(
    pageName,
    'message',
    page.data.message
  )

  return (
    <>
      <h1 className={classes.resultSymbol}>404</h1>
      <h2 className={classes.messageDiv}>{ message }</h2>
    </>
  )
}