import { get_parsed_page_content, ler, msg, pre } from 'src/controllers'
import StateTmp from 'src/controllers/StateTmp'
import { IRedux } from 'src/state'
import { remember_error, remember_exception } from 'src/state/_errors.business.logic'
import { put_req_state } from 'src/state/net.actions'
import { get_state_form_name } from 'src/state/_business.logic'
import { IAnnotation } from '../tuber.interfaces'
import FormValidationPolicy from 'src/controllers/FormValidationPolicy'

/** @id _27_C_1 */
export function form_submit_edit_facebook_annotation(redux: IRedux) {
  return async () => {
    try {
      const { store: { getState, dispatch } } = redux
      const rootState = getState()
      const tmp = new StateTmp(rootState.tmp)
      tmp.configure({ dispatch })
      const index = tmp.get<number>('dialogEditAnnotation', 'index', -1)
      pre('form_submit_edit_facebook_annotation:')
      if (index === -1) {
        ler('index not found.')
        remember_error({
          code: 'value_not_found',
          title: 'Annotation resource index is missing',
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
      const policy = new FormValidationPolicy<IAnnotation>(redux, formName)
      const validation = policy.enforceValidationSchemes()
      if (validation !== false && validation.length > 0) {
        validation.forEach(vError => {
          const message = vError.message ?? ''
          policy.emit(vError.name, message)
        })
        return
      }
      const existingAnnotationResource = rootState
        .data
        .annotations?.[index]

      if (!existingAnnotationResource) {
        ler('bad annotation resource index.')
        return
      }
      pre()
      const formData = policy.getFilteredData()
      const editedAnnotationResource = {
        ...existingAnnotationResource,
        attributes: {
          ...existingAnnotationResource.attributes,
          ...formData
        }
      }

      dispatch({
        type: 'data/resourceUpdate',
        payload: {
          endpoint: 'annotations',
          index,
          resource: editedAnnotationResource
        }
      })

      dispatch(put_req_state(
        `annotations/${editedAnnotationResource.id}`,
        { data: editedAnnotationResource }
      ))
      dispatch({ type: 'dialog/dialogClose' })
    } catch (e: any) {
      ler(e.message)
      remember_exception(e, msg(e.message))
    }
  }
}