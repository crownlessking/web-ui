import { mongoObjectId } from '.'
import {
  IJsonapiError, IJsonapiErrorLinks, IJsonapiErrorSource, IJsonapiMeta
} from './interfaces/IJsonapi'

export default class JsonapiError implements IJsonapiError {
  private e: IJsonapiError
  private idJson?: string

  constructor(e: IJsonapiError) {
    this.e = e
  }

  get id(): string {
    return this.idJson || (this.idJson = this.e.id || mongoObjectId())
  }
  get links(): IJsonapiErrorLinks { return this.e.links || {} }
  get status(): string { return this.e.status || '' }
  get code()  { return this.e.code }
  get title() { return this.e.title }
  get detail(): string { return this.e.detail || '' }
  get source(): IJsonapiErrorSource { return this.e.source || {} }
  get meta(): IJsonapiMeta { return this.e.meta || {} }
}
