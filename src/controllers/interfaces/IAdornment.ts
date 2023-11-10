/**
 * Type for textfield adornment, e.g.
 *
 * icons and text symbol located within the textfield that serve as a type of
 * label. e.g.  
 * ```json
 * {
 *   'type': 'textfield',
 *   'name': 'machine_name',
 *   'props': {}, // Maerial-ui props
 *   'inputProps': {
 *     'start': { // IAdornment start here
 *       'icon': {},
 *       'faIcon': (),
 *        
 *     }
 *   }
 * }
 * ```
 */
export default interface IAdornment {
  position: 'start' | 'end'
  type?: 'text' | 'button'
  /** Material-UI icon */
  icon?: string
  /** Fontawesone icon */
  faIcon?: string
  text?: string
  [props: string]: any
}
