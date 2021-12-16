import React, { Component } from 'react'
import {
  APP_CONTENT_FORM, APP_CONTENT_WEBAPP, APP_CONTENT_VIEW, APP_CONTENT_HTML
} from '../controllers'
import {
  IStatePage, IStateAllForms, IStateApp,
} from '../interfaces'
import Form from '../mui4/form'
import { FormItems } from '../mui4/form/items'
import View from './view.component'
import StatePage from '../controllers/StatePage'
import {
  createStyles, withStyles, WithStyles
} from '@material-ui/core'

const styles = () => createStyles({
  htmlContent: {
    width: '100%'
  }
})

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

interface IProps extends WithStyles<typeof styles> {
  def: StatePage
}

/**
 * Application content
 */
export default withStyles(styles)(class Content extends Component<IProps> {

  render() {
    const { def: page, classes } = this.props

    const type = page.contentType.toLowerCase()
    let contentJsx: JSX.Element | null

    switch (type) {

    case APP_CONTENT_FORM: // Form as content 
      currentContentJsx = contentJsx = (
        <Form def={page}>
          <FormItems def={page} />
        </Form>
      )
      break

    case APP_CONTENT_VIEW: // Content type to display data
      currentContentJsx = contentJsx = <View def={page} />
      break

    case APP_CONTENT_WEBAPP: // full-fledge application content type
      // Think of WebApp as independent pieces of software
      // Any component which has dual purpose (e.g. read and edit) is a WebApp

      // [TODO] When that time comes, the web app will receive the JSON data
      //        from children e.g.
      //        <WebApp>
      //          { data }
      //        </WebApp>
      //        Then it will take the data and display it like its suppose to
      currentContentJsx = contentJsx = ( null )
      break

    // [TODO] add more cases here for different types of content

    /*
     * [TODO] Implement a solution for loading html files from server
     *        possible solution at:
     *        https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes/3535126        
     */
    case APP_CONTENT_HTML:
      const domElement = document.getElementById(page.contentName)

      if (domElement) {
        currentContentJsx = contentJsx = (
          <div
            dangerouslySetInnerHTML={{__html: domElement.innerHTML}}
            className={classes.htmlContent}
            style={{
              fontFamily: page.typography.fontFamily,
              color: page.typography.color
            }}
          />
        )
      } else {
        currentContentJsx = contentJsx = ( null )
      }

      break // END of APP_CONTENT_HTML ----------------------------------------

    default:
      contentJsx = currentContentJsx
      break

    }
    return contentJsx
  } // END render()

})
