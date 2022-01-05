import { SelectProps } from '@mui/material/Select'
import { RadioProps } from '@mui/material/Radio'
import { BadgeProps } from '@mui/material'
import enhancedStore from './state'
import allActions from './state/actions'

/**
 * Ensures that callbacks for buttons, links (, and more) can access the redux
 * store and fire all available redux actions...
 * Even if the callback is implemented in a pure javascript file.
 */
export interface IRedux {
  store: typeof enhancedStore
  actions: typeof allActions

  /**
   * If you don't want to define a callback for your button or link,
   * you can use the href prop to set the target page. It's value will
   * then be passed to this route key.
   */
  route?: string
}

/* ----------------------------------------------------------------------------
Form items definition
---------------------------------------------------------------------------- */

export interface IStateFormSelectOption {
  title?: string
  value: string
}

export interface IStateFormSelect extends SelectProps {
  has?: IStateFormItemCustom
}

export interface IStateLink {
  type: 'text' | 'textlogo' | 'icon' | 'hybrid' | 'link'
  onClick?: (redux: IRedux) => (e: any) => void
  has?: IStateFormItemCustom
  href?: string
  [attr: string]: any
}

/**
 * Use when component receives its parent state
 */
export interface IParentState {
  state: any
  setState: Function
}

export interface IStateNet {

  /**
   * Name of property or attribute where the token is stored.
   */
  csrfTokenName?: string

  /**
   * Method used to store the CSRF token.
   *
   * List of methods:
   *
   * - **meta**  
   *    With the meta solution, the token will be stored as the value of the
   *    content attribute of a meta tag which will be identified by the value
   *    supplied in the csrf token name. e.g.
   *    ```html
   *    <meta name="csrf-token-name" content="token" />
   *    ```
   *
   * - **javascript**  
   *   With the javascript method, the token will be assumed to be saved as a
   *   global variable or at least nested within a global variable that is an
   *   object. If the latter is the case, you can supply a dot-separated list
   *   of properties as a string which is the exact location of the token.
   *   e.g.  
   *
   *   ```ts
   *   var globalVar = {
   *     property1: {
   *       token: '...'
   *     }
   *   };
   *   const csrfTokenName = 'globalVar.property1.token'
   *   ```
   *
   */
  csrfTokenMethod?: 'meta' | 'javascript'

  /**
   * CSRF Token.
   *
   * Contains the CSRF token once it is retrieved.
   */
  csrfToken?: string

  /**
   * Any value inserted here is automatically included as POST request headers.
   *
   * In addition, cone expressions are supported.
   */
  headers?: { [prop: string]: string }
}
