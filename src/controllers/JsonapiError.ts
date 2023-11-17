import { mongo_object_id } from '../business.logic'
import {
  IJsonapiError, IJsonapiErrorLinks, IJsonapiErrorSource, IJsonapiMeta
} from '../interfaces/IJsonapi'

export default class JsonapiError implements IJsonapiError {
  private idJson?: string

  constructor(private e: IJsonapiError) {}

  get json(): IJsonapiError { return this.e }
  get id(): string {
    return this.idJson || (this.idJson = this.e.id || mongo_object_id())
  }
  get links(): IJsonapiErrorLinks { return this.e.links ?? {} }
  get status(): string { return this.e.status ?? '' }
  get code()  { return this.e.code }
  get title() { return this.e.title }
  get detail(): string { return this.e.detail ?? '' }
  get source(): IJsonapiErrorSource { return this.e.source ?? {} }
  get meta(): IJsonapiMeta { return this.e.meta ?? {} }
}
