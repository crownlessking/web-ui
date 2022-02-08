import { IJsonapiPaginationLinks } from './IStateNet'

export default interface IStateTopLevelLinks {
  [endpoint: string]: IJsonapiPaginationLinks
}
