import { INetState } from './IState'

/* ----------------------------------------------------------------------------
RESPONSE SPECIFICATION
---------------------------------------------------------------------------- */

export interface IResponseRequirement {
  driver?: string
  state?: INetState
}

/* ----------------------------------------------------------------------------
JSONAPI SPECIFICATION
---------------------------------------------------------------------------- */

/**
 * Type for the server response's `jsonapi` member.  
 * An object describing the server’s implementation.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {} // <-- Type for that member
 * }
 * ```
 * @see https://jsonapi.org/format/#document-jsonapi-object
 */
export interface IJsonapiMember {
  version: string
  [key: string]: string | undefined
}

/**
 * Type for the server response's `meta` member.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {},
 *    "meta": {} // <-- type for that member
 * }
 * ```
 * @see https://jsonapi.org/format/#document-meta
 */
export interface IJsonapiMeta {
  [key: string]: any
}

/**
 * @see https://jsonapi.org/format/#document-links
 */
export interface IJsonapiLink {
  href: string
  meta?: IJsonapiMeta
}

export interface IJsonapiErrorLinks {
  about?: IJsonapiLink
  [prop: string]: IJsonapiLink | string | undefined
}

export interface IJsonapiErrorSource {
  pointer?: string
  parameter?: string
}

/**
 * Type for the server response's `errors` member array elements.
 *
 * _Example Json document_:
 * ```json
 * {
 *    "jsonapi": {},
 *    "meta": {},
 *    "errors": [] // <-- type for elements
 * }
 * ```
 * @see https://jsonapi.org/format/#errors
 */
export interface IJsonapiError {
  id?: string
  links?: IJsonapiErrorLinks
  status?: string
  code: string
  title: string
  detail?: string
  source?: IJsonapiErrorSource
  meta?: IJsonapiMeta
}

interface IJsonapiAbstractLinks {
  self: IJsonapiLink | string
  related?: IJsonapiLink | string
}

/**
 * @see https://jsonapi.org/format/#fetching-pagination
 */
export interface IJsonapiPaginationLinks extends IJsonapiAbstractLinks {
  first?: IJsonapiLink | string
  last?: IJsonapiLink | string
  prev?: IJsonapiLink | string
  next?: IJsonapiLink | string
  [key: string]: IJsonapiLink | string | undefined
}

export interface IJsonapiResourceLinks extends IJsonapiAbstractLinks {
  [key: string]: IJsonapiLink | string | undefined
}

interface IJsonapiResourceAbstract {
  meta?: IJsonapiMeta
  links?: IJsonapiResourceLinks
}

/**
 * @see https://jsonapi.org/format/#document-compound-documents
 */
export interface IJsonapiCompoundDoc {
  type: string
  id?: string
}

/**
 * @see https://jsonapi.org/format/#document-resource-object-linkage
 */
export interface IJsonapiResourceLinkage extends IJsonapiCompoundDoc {
  id: string
}

/**
 * @see https://jsonapi.org/format/#document-resource-object-relationships
 */
export interface IJsonapiRelationship extends IJsonapiResourceAbstract {
  data: IJsonapiResourceLinkage
}
export interface IJsonapiDataRelationships {
  [key: string]: IJsonapiRelationship
}

/**
 * @see https://jsonapi.org/format/#document-resource-objects
 */
export interface IJsonapiDataAttributes {
  [key: string]: string
}
export interface IJsonapiResource extends IJsonapiCompoundDoc, IJsonapiResourceAbstract {
  attributes?: IJsonapiDataAttributes
  relationships?: IJsonapiDataRelationships
}

export interface IAbstractResponse extends IResponseRequirement {
  jsonapi?: IJsonapiMember
}
export interface IJsonapiBaseResponse extends IAbstractResponse {
  meta?: IJsonapiMeta
  links?: IJsonapiPaginationLinks
}
export interface IJsonapiMetaResponse extends IJsonapiBaseResponse {
  meta: IJsonapiMeta
}
export interface IJsonapiDataResponse extends IJsonapiBaseResponse {
  data: IJsonapiResource[] | IJsonapiResource | IJsonapiResourceLinkage | null
  included?: any[]
}
export interface IJsonapiErrorResponse extends IJsonapiBaseResponse {
  errors: IJsonapiError[]
}

/**
 * @see https://jsonapi.org/format/#document-top-level
 */
export interface IJsonapiResponse extends IJsonapiBaseResponse {
  data?: IJsonapiResource[] | IJsonapiResource | IJsonapiResourceLinkage | null
  errors?: IJsonapiError[]
  included?: any[]
}

export default interface IStateNet {
  /** Name of property or attribute where the token is stored. */
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