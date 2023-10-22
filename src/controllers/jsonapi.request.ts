import {
  IJsonapiDataAttributes,
  IJsonapiDataRelationships,
  IJsonapiRequest,
  IJsonapiResourceLinks
} from './interfaces/IJsonapi'
import { IGenericObject } from './interfaces/IState'

/** Format the request using the jsonapi specification */
export default class JsonapiRequest<T=IJsonapiDataAttributes> {

  private request: IJsonapiRequest<T>

  constructor(type: string, attributes: T) {
    this.request = {
      data: {
        type,
        attributes
      }
    }
  }

  setType(type: string) {
    this.request.data.type = type
    return this
  }

  setId(id: string) {
    this.request.data.id = id
    return this
  }

  setAttributes(attributes: T) {
    this.request.data.attributes = attributes
    return this
  }

  setRelationships(relationships: IJsonapiDataRelationships) {
    this.request.data.relationships = relationships
    return this
  }

  setMeta(meta: IGenericObject) {
    this.request.data.meta = meta
    return this
  }

  meta(key: string, value: any) {
    if (!this.request.data.meta) {
      this.request.data.meta = {}
    }
    this.request.data.meta[key] = value
    return this
  }

  setLinks(links: IJsonapiResourceLinks) {
    this.request.data.links = links
    return this
  }

  link(key: string, value: string) {
    if (!this.request.data.links) {
      this.request.data.links = { self: '' }
    }
    this.request.data.links[key] = value
    return this
  }

  build() { return this.request }
}