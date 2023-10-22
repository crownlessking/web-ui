import { IJsonapiPaginationLinks } from '../controllers/interfaces/IJsonapi'

type TLink = IJsonapiPaginationLinks[keyof IJsonapiPaginationLinks]

/** Get the string value of a jsonapi link. */
export function jsonapi_get_link_str(link: TLink) {
  switch (typeof link) {
    case 'string':
      return link
    case 'object':
      return link.href
    default:
      return ''
  }
}

/** Get the value of a query string parameter. */
export function jsonapi_gen_link_str(
  page: number,
  pageSize: number
): string {
  return `?page[number]=${page}&page[size]=${pageSize}`
}