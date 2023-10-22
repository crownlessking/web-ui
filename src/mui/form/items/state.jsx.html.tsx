import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import StateForm from 'src/controllers/StateForm'
import StateFormItem from 'src/controllers/StateFormItem'
import { RootState } from 'src/state'

/* Contains HTML components which are styled so they can use the `sx` prop. */
export const get_styled_div = () => styled('div')(() => ({}))

/** Parse handlebar notations */
export function parseHandlebars(html: string, obj?: {[key: string]: any}) {
  if (!obj) return html
  Object.keys(obj).forEach(key => {
    const value = obj[key] || '&#128681;'
    const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    html = html.replace(re, value)
  })
  return html
}

/**
 * Renders HTML as JSX.
 *
 * ```json
 * {
 *   "type": "html",
 *      "props": { "sx": { } },
 *      "has": {
 *        "content": "<div>Hello world!</div>",
 * 
 *         // [optional] page route or key is used if the content is a
 *         // handlebars template. The values will be retrieve from the
 *         // pagesData state. e.g. pagesData.home
 *        "route": "home",
 *         // or
 *        "key": "home"
 *      }
 *   },
 * }
 * ```
 */
export function StateJsxHtml({ def: html }: { def: StateFormItem<StateForm, string> }) {
  let htmlText =  html.has.text || html.has.content
  const pagesDataState = useSelector((state: RootState) => state.pagesData)

  if (html.has.key || html.has.route) {
    const pageData = pagesDataState[html.has.key || html.has.route]
    htmlText = parseHandlebars(html.has.content || html.has.text, pageData)
  }

  return (
    <Box
      {...html.props}
      dangerouslySetInnerHTML={{ __html: htmlText }}
    />
  )
}
