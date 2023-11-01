import { Fragment } from 'react'
import { STATE_BUTTON } from '../../../constants'
import StateForm from 'src/controllers/StateForm'
import IStateFormItem from '../../../controllers/interfaces/IStateFormItem'
import StateFormItem from '../../../controllers/StateFormItem'
import JsonDialogAction from './actions.button.form'

interface IFieldItemProps {
  def: IStateFormItem[]
  parent: StateForm
}

export default function DialogAction({
  def: formItems,
  parent
}: IFieldItemProps) {
  return (
    <Fragment>
      {formItems.map((json, i) => {
        if (json.type.toLowerCase() !== STATE_BUTTON) { return ( null ) }
        const item = new StateFormItem(json, parent)
        return <JsonDialogAction def={item} key={`dialgo-action-${i}`} />
      })}
    </Fragment>
  )
}
