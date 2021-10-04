
import { IStatePage, IStateDialogForm, IJsonapiLink } from '../../../interfaces'
import { getTableViewColumns } from '../controller'
import { getDudEventCallback } from '../../../controllers'
import dateFormat from 'dateformat'
import StatePage from '../../../state/pages/page.controller'
import StateDialogForm from '../../../state/dialogs/form.dialog.controller'
import Config from '../../../config'

/**
 * Represents the type of the row object provided by `onRowClick` attribute on
 * the `<VirtualizedTable />` component.
 *
 * Note: The representation may not be accurate but it is good enough for what
 *       we are trying to do.
 */
export interface ISingleRow {
  event: any,
  index: number, // Index of row in the table
  rowData: any // The JSON document (resource) from the server
}

/**
 * Get the jsonapi link URI.
 *
 * Use this function to get the link URI without having to figure out if the
 * link is a string or an object.
 *
 * @param link 
 */
export function getLinkUri(link?: IJsonapiLink | string) {
  if (typeof link === 'string') {
    return link
  } else if (link) {
    return link.href
  }
  return ''
}

/**
 * Ensures the trailing slash is present on the origin URL.
 *
 * @param origin url
 * @returns string
 */
export function getOriginEndingFixed(origin: string) {
  if (origin) {
    const endingChar = origin.charAt(origin.length - 1)
    return endingChar === '/' ? origin : origin + '/'
  }
  if (Config.DEBUG) console.log('origin is empty.')
  return '/'
}

/**
 * A safe way of retrieving user defined columns from page definition.
 * .i.e.
 * ```ts
 * const statePage = {
 *   'meta': {
 *       'columns': [ ] // <-- returns this
 *   }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 * @param obj `state.data[endpoint]`
 */
export function getVirtualizedTableColumns(page: StatePage, obj: any) {
  return page.meta.columns || getTableViewColumns(obj)
}

/**
 * Retrieves a value from table row.
 *
 * @param singleRow JSON document (resource) from server
 * @param key a key that should exist in `rowData`
 */
export function getRowFieldValue(singleRow: ISingleRow, key: string) {
  const rowData = singleRow.rowData || { }

  return rowData[key] || null
}

/**
 * Sort rows of data in ascending, descending, or by date.
 *
 * The type of sort is indicated in the meta data of the page definition.
 * .i.e.
 * ```ts
 * const statePage = {
 *   'meta': {
 *      'sortBy': 'date' | 'asc' | 'desc'
 *   }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 * @param rows array of JSON documents (resources)
 */
export function getSortedRows(page: StatePage, rows: any[]) {
  if (!rows) {
    return null
  }

  const sortBy: string = page.meta.sortBy ? page.meta.sortBy : 'none'

  switch (sortBy.toUpperCase()) {

  case 'DATE':
    return rows.sort((a, b) => {
      const ad = new Date(a.attributes.createdAt || a.createdAt) 
      const bd = new Date(b.attributes.createdAt || b.createdAt)
      return bd.getTime() - ad.getTime()
    })

  case 'ASC':
    throw new Error('Sorting in \'asc\' is not yet implemented.')

  case 'DESC':
    throw new Error('Sorting in \'desc\' is not yet implemented.')

  default:
  case 'NONE':
    return rows
  }

}

/**
 * Extracts the dialog state from the page state.
 * i.e.
 * ```ts
 * const statePage = {
 *    'meta': {
 *        'dialog': { } // <-- returns this
 *    }
 * }
 * ```
 * This function prevents an exception to be thrown if the dialog state was not
 * defined.
 *
 * @param page `state.pages[<identifier>]`
 */
export function getMetaDialog(page: StatePage): IStateDialogForm {
  return page.meta.dialog || { items: [] }
}

/**
 * Get a form Dialog definition.
 *
 * @param page 
 */
export function getMetaDialogDef(page: StatePage): StateDialogForm {
  let dialog: IStateDialogForm
  try {
    dialog = page.meta.dialog
  } catch (e) {
    dialog = { items: [] }
  }
  return new StateDialogForm(dialog, page)
}

/**
 * A safe way of retrieving the user-defined dialog content text.
 * .i.e.
 * ```ts
 * const statePage = {
 *   'meta': {
 *      'dialog': {
 *         'contentText': String // <-- returs this
 *      }
 *   }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 */
export function getMetaDialogContentText(page: StatePage) {
  const dialog = getMetaDialog(page)

  return dialog.contentText || ''
}

/**
 * Parse dialog's title
 *
 * You can define the type of the data to be used as title. .i.e.
 * 
 * ```ts
 * const title = 'createdAt@datetime'
 * ```
 *
 * Where the string before `@` is the identifier of the data to be used as the
 * title and the one after is the type. This allows for additional formatting
 * to be applied to the data before it is displayed as the title.
 *
 * @param _default
 * @param compositeTitle
 */
function parseDialogTitle(_default: string, compositeTitle?: string) {
  try {
    const fragments = (compositeTitle || '').replace(/\s+/,'').split('@')
    if (fragments.length === 1) {
      return {
        key: fragments[0],
        type: 'string'
      }
    } else if (fragments.length >= 2) {
      return {
        key: fragments[0],
        type: fragments[1] || 'string'
      }
    }
  } catch (e) { }

  return { key: _default, type: 'string' }
}

/**
 *  A safe way of retrieving the user-defined dialog title. i.e.
 * ```ts
 * const statePage = {
 *    'meta': {
 *       'dialog': {
 *          'title': String // <-- returns this
 *       }
 *    }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 * @param singleRow contains a JSON document (resource)
 */
export function getMetaDialogTitle(page: StatePage, singleRow?: ISingleRow) {
  const defaultKey = '_id'
  if (singleRow) {
    const keyAtType = getMetaDialog(page).title
    const { key, type } = parseDialogTitle(defaultKey, keyAtType)
    return { key, type, title: getRowFieldValue(singleRow, key) }
  }
  return { key: null, type: 'string', title: '' }
}

/**
 * A safe way of retrieving the value of the key that indicates whether the
 * dialog actions should be shown or not. e.i.
 * ```ts
 * const statePage = {
 *   'meta': {
 *      'dialog': {
 *         'showActions': Boolean // <-- returns this
 *      }
 *   }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 */
export function getMetaDialogShowActions(page: StatePage) {
  return getMetaDialog(page).showActions || false
}

/**
 * A safe way of retrieving the custom callback to be applied to the submission
 * button of the dialog form. i.e.
 * ```ts
 * const pageState = {
 *   'meta': {
 *      'dialog': {
 *         'onSubmit': Function // <-- returns this
 *      }
 *   }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 */
export function getMetaDialogOnSubmit(page: StatePage) {
  return getMetaDialog(page).onSubmit || getDudEventCallback()
}

/**
 * A safe way of acquiring the form dialog actions. i.e.
 * ```ts
 * const pageState = {
 *   'meta': {
 *      'dialog': {
 *          'actions': [ ] // <-- returns this
 *      }
 *   }
 * }
 * ```
 *
 * @param page 
 */
export function getMetaDialogActions(page: StatePage) {
  return getMetaDialog(page).actions || []
}

/**
 * If a custom submission callback was not provided, then this function will
 * set the default.
 *
 * @param page 
 * @param defaultSubmit 
 */
export function applyDefaultSubmissionCallback(page: StatePage, defaultSubmit: () => void) {
  const dialog = getMetaDialog(page)
  dialog.onSubmit = dialog.onSubmit || defaultSubmit
}

/**
 * Break apart two values that are glued in one using the `@` symbol and
 * returns and object containing the both values. i.e.
 *
 * @param composite `type@format`
 */
function parseCompositeVal(composite: string) {
  const fragments = (composite || '').split('@')
  if (fragments.length > 1) {
    return { type: fragments[0].trim(), format: fragments[1].trim() }
  } else if (fragments.length === 1) {
    return { type: '', format: fragments[0].trim() }
  }
  return { type: '', format: '' }
}

/**
 * Row formatting: applies a filter to the values in a row (JSON document).
 *
 * That filter is a function that can be defined in the `meta` member of the
 * `statePage`. i.e.
 * ```ts
 * const statePage = {
 *    'meta': {
 *       'filters': {
 *
 *          // x is the dataKey identifier and the value at that
 *          // key, i.e. row[dataKey] will be passed to the
 *          // function to apply any modification you wish.
 *          [x: String]: function(rowData) {}
 *       }
 *    }
 * }
 * ```
 * @param page `state.pages[<identifier>]`
 * @param rows array of JSON documents (resources)
 * @param index index in `rows`
 */
export function filterRow(page: IStatePage, rows: any[], index: number) {
  const data = rows[index].attributes || rows[index]
  const filters = page.meta.filters
  if (filters) {
    try {
      for (const dataKey in filters) {
        const filter = filters[dataKey]
        const value = data[dataKey]
        switch (typeof filter) {
        case 'function':
          data[dataKey] = filter(value)
          break
        case 'string':
          const result = parseCompositeVal(filter)
          switch (result.type.toUpperCase()) {
          case 'DATETIME':
            data[dataKey] = dateFormat(value, result.format)
            break
          }
          break
        }
      }

      return data
    } catch (e) {}
  }

  return data
}
