import { get_parsed_page_content, ler, msg, pre } from 'src/controllers'
import StateTmp from 'src/controllers/StateTmp'
import { IRedux } from 'src/state'
import { remember_error, remember_exception } from 'src/state/_errors.business.logic'
import { put_req_state } from 'src/state/net.actions'
import { get_state_form_name } from 'src/state/_business.logic'
import { IBookmark } from '../tuber.interfaces'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'

/** @id _31_C_1 */
export function form_submit_edit_unknown_bookmark(redux: IRedux) {
  return async () => {
    try {
      const { store: { getState, dispatch } } = redux
      const rootState = getState()
      const tmp = new StateTmp(rootState.tmp)
      tmp.configure({ dispatch })
      const index = tmp.get<number>('dialogEditBookmark', 'index', -1)
      pre('form_submit_edit_unknown_bookmark:')
      if (index === -1) {
        ler('index not found.')
        remember_error({
          code: 'value_not_found',
          title: 'Bookmark resource index not found',
        })
        return
      }
      const content = rootState.dialog.content as string
      const pageContentForm = get_parsed_page_content(content)
      const formName = get_state_form_name(pageContentForm.name)
      if (!rootState.formsData[formName]) {
        const errorMsg = msg(` '${formName}' data does not exist.`)
        ler(errorMsg)
        remember_error({
          code: 'value_not_found',
          title: errorMsg,
          source: { parameter: 'formData' }
        })
        return
      }
      const policy = new FormValidationPolicy<IBookmark>(redux, formName)
      const validation = policy.enforceValidationSchemes()
      if (validation !== false && validation.length > 0) {
        validation.forEach(vError => {
          const message = vError.message ?? ''
          policy.emit(vError.name, message)
        })
        return
      }
      const existingBookmarkResource = rootState
        .data
        .bookmarks?.[index]

      if (!existingBookmarkResource) {
        ler('bad bookmark resource index.')
        return
      }
      pre()
      const formData = policy.getFilteredData()
      const editedBookmarkResource = {
        ...existingBookmarkResource,
        attributes: {
          ...existingBookmarkResource.attributes,
          ...formData
        }
      }

      dispatch({
        type: 'data/resourceUpdate',
        payload: {
          endpoint: 'bookmarks',
          index,
          resource: editedBookmarkResource
        }
      })

      dispatch(put_req_state(
        `bookmarks/${editedBookmarkResource.id}`,
        { data: editedBookmarkResource }
      ))
      dispatch({ type: 'dialog/dialogClose' })
    } catch (e: any) {
      ler(e.message)
      remember_exception(e, msg(e.message))
    }
  }
}