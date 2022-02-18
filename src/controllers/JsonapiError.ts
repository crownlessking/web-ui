import {
  IJsonapiError, IJsonapiErrorLinks, IJsonapiErrorSource, IJsonapiMeta
} from './interfaces/IStateNet'

export default class JsonapiError implements IJsonapiError {
  private e: IJsonapiError

  constructor(e: IJsonapiError) {
    this.e = e
  }

  get id(): string { return this.e.id || '' }
  get links(): IJsonapiErrorLinks { return this.e.links || {} }
  get status(): string { return this.e.status || '' }
  get code()  { return this.e.code }
  get title() { return this.e.title }
  get detail(): string { return this.e.detail || '' }
  get source(): IJsonapiErrorSource { return this.e.source || {} }
  get meta(): IJsonapiMeta { return this.e.meta || {} }
}
