/**
 * Controller file
 */
import { ButtonProps } from '@mui/material/Button'
import { IStateFormItem } from '../../../../controllers/StateFormItem'

/**
 * Converts to a valid `props` object for a _material-ui_ button.
 *
 * Use this function on your `IFormItemDef` object if you intend to spread it as
 * `props` for a button. e.g.
 * 
 * ```tsx
 * const def: IFormItemDef
 * const props = getButtonProps(def)
 * 
 * return <Button {...props}>Foo</Button>
 * ```
 *
 * @param def 
 */
export function getButtonProps(def: IStateFormItem) {
  const copyDef = { ...def } as ButtonProps

  // onClick is removed because it is defined as returning a function
  //
  // e.g.
  // onClick = redux => e => void
  //
  // which is not compatible with the expected returned type from the
  // the materia-ui ButtonProp.onClick version
  // Plus we need to supply the "Redux" object to it.
  delete copyDef.onClick

  // delete copyDef.has
  // copyDef.type = ''

  return copyDef
}
