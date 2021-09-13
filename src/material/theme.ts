
import { orange } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'

/**
 * For a complete structure of the theme object, visit:
 *
 * @link https://material-ui.com/customization/default-theme/?expend-path=$.typography
 */
export default createTheme({
  palette: {
    primary: {
      main: '#318ee8' // '#808000' // olive
    },
    secondary: {
      main: orange[800]
    },
  },
})
