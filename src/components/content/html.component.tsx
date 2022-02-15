import { makeStyles } from '@mui/styles'
import StatePage from '../../controllers/StatePage'

const useStyles = makeStyles(() => ({
  htmlContent: {
    width: '100%'
  }
}))

interface IHtmlContent {
  def: StatePage
}

export default function HtmlContent ({ def: page }: IHtmlContent) {
  const classes = useStyles()
  const domElement = document.getElementById(page.contentName)

  if (domElement) {
    return (
      <div
        dangerouslySetInnerHTML={{__html: domElement.innerHTML}}
        className={classes.htmlContent}
        style={{
          fontFamily: page.typography.fontFamily,
          color: page.typography.color
        }}
      />
    )
  }

  return ( null )
}
