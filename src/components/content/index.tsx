import View from '../view.component'
import StatePage from '../../controllers/StatePage'
import { useDispatch } from 'react-redux'
import { AppDispatch, ler } from '../../state'
import { post_req_state } from '../../state/net.actions'
import IStateApp from '../../controllers/interfaces/IStateApp'
import IStateAllForms from '../../controllers/interfaces/IStateAllForms'
import IStatePage from '../../controllers/interfaces/IStatePage'
import HtmlContent from './html.component'
import { APP_CONTENT_VIEW } from '../../constants'
import { remember_exception } from 'src/state/_errors.business.logic'
import FormContent from './form.component'
import WebApps from './webapp.content.component'

/**
 * Holds the last rendered content so that if a new one was not provided,
 * that one can be used.
 */
let currentContentJsx: JSX.Element | null

export interface IContentState {
  stateApp: IStateApp
  stateForms: IStateAllForms
  statePage: IStatePage
}

interface IContentProps {
  def: StatePage
}

interface IContentTable {
  [constant: string]: () => void
}

/**
 * Application content
 */
export default function Content (props: IContentProps) {
  const APP_CONTENT_FORM = '$form'
  const APP_CONTENT_WEBAPP = '$webapp'
  const APP_CONTENT_HTML = '$html'
  const APP_CONTENT_FORM_LOAD = '$form_load'
  const APP_CONTENT_HTML_LOAD = '$html_load'

  const { def: page } = props
  const type = page.contentType.toLowerCase()
  let contentJsx: JSX.Element | null = ( null )
  const dispatch = useDispatch<AppDispatch>()

  const contentTable: IContentTable = {
    [APP_CONTENT_FORM]: () => {
      const form = page.parent.parent.allForms.getForm(page.contentName)
      if (form) { form.endpoint = page.contentEndpoint }
      currentContentJsx = contentJsx = (
        <FormContent
          formName={page.contentName}
          def={form}
          type={'page'}
        />
      )
    },
    [APP_CONTENT_VIEW]: () => {
      currentContentJsx = contentJsx = <View def={page} />
    },
    // full-fledge application content type
    // Think of WebApp as independent pieces of software
    // Any component which has dual purpose (e.g. read and edit) is a WebApp
    [APP_CONTENT_WEBAPP]: () => {
      try {
        contentJsx = <WebApps def={page} />
        if (contentJsx) {
          currentContentJsx = contentJsx
        } else {
          currentContentJsx = contentJsx = ( null )
        }
      } catch (e: any) {
        const message = `Bad page content.\n${e.message}`
        ler(message)
        remember_exception(e, message)
        currentContentJsx = contentJsx = ( null )
      }
    },
    /*
     * [TODO] Implement a solution for loading html files from server
     *        possible solution at:
     *        https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes/3535126        
     */
    [APP_CONTENT_HTML]: () => {
      currentContentJsx = contentJsx = <HtmlContent def={page} />
    },
    [APP_CONTENT_FORM_LOAD]: () => {
      dispatch(post_req_state(page.contentEndpoint))
      currentContentJsx = contentJsx = ( null )
    },
    [APP_CONTENT_HTML_LOAD]: () => currentContentJsx = contentJsx = ( null ),

    // [TODO] add more properties here for different types of content

    $default: () => contentJsx = currentContentJsx
  }

  try {
    contentTable[type]()
  } catch (e: any) {
    const message = `Bad page content. ${e.message}`
    ler(message)
    remember_exception(e, message)
    contentTable['$default']()
  }

  return contentJsx
}
