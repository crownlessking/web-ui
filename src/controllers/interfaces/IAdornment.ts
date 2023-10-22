/**
 * Type for textfield adornment, e.g.
 *
 * icons and text symbol located within the textfield that serve as a type of
 * label.
 */
export default interface IAdornment {
  position: 'start' | 'end'
  type?: 'text' | 'button'
  icon?: string
  faIcon?: string
  text?: string
  [props: string]: any
}
